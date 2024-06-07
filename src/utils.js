import DOMPurify from 'dompurify'

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

const getElement = ( nodeOrSelector ) => {
	if ( typeof nodeOrSelector === 'string' ) {
		return document.querySelector( nodeOrSelector )
	}
	return nodeOrSelector
}

const getLinkIconSvg = ( dir = 'ltr' ) => {
	if ( dir === 'ltr' ) {
		return `
			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
				<path fill="#36C" fill-rule="evenodd" d="M11 1H6l2.148 2.144-4.15 4.15.707.708 4.15-4.15L11 6V1ZM4 3H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8H8v2H2V4h2V3Z" clip-rule="evenodd"/>
			</svg>
		`.trim()
	}

	return `
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
			<path fill="#36C" fill-rule="evenodd" d="M1 1h5L3.852 3.144l4.15 4.15-.707.708-4.15-4.15L1 6V1Zm7 2h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8h1v2h6V4H8V3Z" clip-rule="evenodd"/>
		</svg>
	`.trim()
}

export {
	getWikipediaAttrFromUrl, isTouch, isOnline, getDir, buildMwApiUrl,
	convertUrlToMobile, strip, sanitizeHTML, getDeviceSize, getAnalyticsQueryParam,
	buildWikipediaUrl, version, logError, getElement, getLinkIconSvg
}
