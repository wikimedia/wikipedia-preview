import DOMPurify from 'dompurify'
import { computePosition, autoPlacement, arrow, offset, inline, shift } from '@floating-ui/dom'

const decodeUri = ( uri ) => {
	// Attempt to decode links that have been encoded multiple times
	const maxAttempts = 5
	let currentUri = uri

	for ( let i = 0; i < maxAttempts; i++ ) {
		const decoded = decodeURIComponent( currentUri )
		if ( decoded === currentUri ) {
			return decoded
		} else {
			currentUri = decoded
		}
	}

	return currentUri
}

const getWikipediaAttrFromUrl = ( url ) => {
	const regexList = [
		// https://zh.wikipedia.org/wiki/前岐镇"
		// https://en.wikipedia.org/wiki/Cat#Section
		/^https?:\/\/([\w-]{2,}\.)?(m\.)?wikipedia\.org\/wiki\/([^#?]+)/,
		// https://en.wikipedia.org/w/index.php?title=Cat
		// https://zh.wikipedia.org/w/index.php?title=太阳帆&action=purge
		/^https?:\/\/([\w-]{2,}\.)?(m\.)?wikipedia\.org\/w\/index.php\?title=([^#&]+)/
	]

	for ( let i = 0; i < regexList.length; i++ ) {
		const matches = regexList[ i ].exec( url )
		if ( matches ) {
			return {
				lang: matches[ 1 ] ? matches[ 1 ].slice( 0, -1 ) : 'en',
				mobile: !!matches[ 2 ],
				title: decodeUri( matches[ 3 ] )
			}
		}
	}

	return null
}

const isTouch = 'ontouchstart' in window || ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 )

const isOnline = () => window.navigator.onLine

const getDir = ( lang ) => {
	const rtl = [ 'ar', 'arc', 'arz', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi', 'pnb', 'ckb', 'mzn', 'glk', 'ug', 'sd', 'azb', 'lrc' ]
	return rtl.indexOf( lang ) === -1 ? 'ltr' : 'rtl'
}

const defaultParams = {
	format: 'json',
	formatversion: 2,
	origin: '*'
}

const buildMwApiUrl = ( lang, params ) => {
	params = { ...defaultParams, ...params }
	const baseUrl = `https://${ lang }.wikipedia.org/w/api.php`
	return baseUrl + '?' + Object.keys( params ).map( ( p ) => {
		return `${ p }=${ encodeURIComponent( params[ p ] ) }`
	} ).join( '&' )
}

const convertUrlToMobile = ( url ) => {
	return url.replace( /https:\/\/(.*?)\./, ( subDomain ) => subDomain + 'm.' )
}

const strip = ( html ) => {
	const doc = new window.DOMParser().parseFromString( html, 'text/html' )
	for ( const span of doc.querySelectorAll( 'span' ) ) {
		if ( span.style.display === 'none' ) {
			span.remove()
		}
	}
	return doc.body.textContent || ''
}

const sanitizeHTML = ( html ) => {
	return DOMPurify.sanitize( html )
}

const getDeviceSize = () => {
	return { height: window.innerHeight, width: window.innerWidth }
}

const getAnalyticsQueryParam = () => 'wprov=wppw2' + ( isTouch ? 't' : '' )

const buildWikipediaUrl = ( lang, title, touch, analytics = true ) => {
	return `https://${ lang }${ touch ? '.m' : '' }.wikipedia.org/wiki/${ encodeURIComponent( title ) }${ analytics ? `?${ getAnalyticsQueryParam() }` : '' }`
}

const version = () => {
	/* eslint-disable-next-line no-undef, no-console */
	console.log( `Wikipedia Preview - version ${ APP_VERSION } (${ GIT_HASH })` )
}

const logError = ( ...err ) => {
	console.error.apply( console, err ) // eslint-disable-line no-console
}

const forEachRoot = ( rootConfig, selector, callback ) => {
	const roots = []
	// rootConfig can be a selector (String)
	if (
		typeof rootConfig === 'string' ||
        rootConfig instanceof String
	) {
		Array.prototype.forEach.call(
			document.querySelectorAll( rootConfig ),
			( node ) => {
				roots.push( node )
			}
		)
	}

	// rootConfig can be a node (Document or Element)
	if ( rootConfig instanceof Document || rootConfig instanceof Element ) {
		roots.push( rootConfig )
	}

	// rootConfig can be a list of nodes (Element[])
	if ( Array.isArray( rootConfig ) ) {
		rootConfig.forEach( ( r ) => {
			if ( r instanceof Element ) {
				roots.push( r )
			}
		} )
	}

	roots.forEach( ( root ) => {
		Array.prototype.forEach.call(
			root.querySelectorAll( selector ),
			callback
		)
	} )
}

const invokeCallback = ( events, name, params ) => {
	const callback = events && events[ name ]
	if ( callback instanceof Function ) {
		try {
			callback.apply( null, params )
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.log( 'Error invoking Wikipedia Preview custom callback', e )
		}
	}
}

const getClientWidth = () => window.innerWidth

const classesToString = ( classes ) => {
	return Object.keys( classes )
		.filter( ( k ) => classes[ k ] )
		.join( ' ' )
}

const getElement = ( nodeOrSelector ) => {
	if ( typeof nodeOrSelector === 'string' ) {
		return document.querySelector( nodeOrSelector )
	}
	return nodeOrSelector
}

const withPx = ( value ) => {
	return value ? ( value + 'px' ) : value
}

const positionPopup = ( target, popup, pointerPosition ) => {
	const arrowEl = popup.querySelector( '.wp-popup-arrow' )
	computePosition( target, popup, {
		middleware: [
			inline( pointerPosition ),
			shift(),
			autoPlacement( {
				allowedPlacements: [ 'top', 'bottom' ]
			} ),
			offset( 10 ),
			arrow( { element: arrowEl } )
		]
	} ).then( ( { x, y, middlewareData, placement } ) => {
		// popup
		popup.style.top = withPx( y )
		popup.style.left = withPx( x )

		// arrow
		if ( middlewareData.arrow && arrowEl ) {
			const { x: arrowX, y: arrowY } = middlewareData.arrow

			arrowEl.style.left = arrowX !== null ? withPx( arrowX ) : ''
			arrowEl.style.top = arrowY !== null ? withPx( arrowY ) : ''

			if ( placement === 'left' ) {
				arrowEl.style.right = '-8px'
				arrowEl.style.transform = 'rotate(90deg)'
			} else if ( placement === 'right' ) {
				arrowEl.style.left = '-8px'
				arrowEl.style.transform = 'rotate(-90deg)'
			} else if ( placement === 'top' ) {
				arrowEl.style.bottom = '-8px'
				arrowEl.style.transform = 'rotate(180deg)'
			} else if ( placement === 'bottom' ) {
				arrowEl.style.top = '-8px'
			}
		}

		popup.style.display = 'block'
	} )
}

export {
	getWikipediaAttrFromUrl, isTouch, isOnline, getDir, buildMwApiUrl,
	convertUrlToMobile, strip, sanitizeHTML, getDeviceSize, getAnalyticsQueryParam,
	buildWikipediaUrl, version, logError, forEachRoot, invokeCallback,
	getClientWidth, classesToString, getElement, positionPopup
}
