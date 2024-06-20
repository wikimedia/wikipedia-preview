import { requestPagePreview, getSections } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from './preview'
import {
	getWikipediaAttrFromUrl, buildWikipediaUrl, getDir, isOnline,
	version, getAnalyticsQueryParam, getElement, isMobile
} from './utils'

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

// getPreviewHtml is meant to be used by the Wordpress plugin only
const getPreviewHtml = ( title, lang, callback ) => {
	requestPagePreview( lang, title, ( data ) => {
		callback( renderPreview( lang, data, isMobile ) )
	} )
}

const forEachRoot = ( rootConfig, callback ) => {
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

	roots.forEach( ( root ) => callback( root ) )
}

let currentPopupId
let currentColorScheme

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body,
	events = {},
	debug = false,
	prefersColorScheme = 'detect'
} ) {
	popupContainer = getElement( popupContainer ) || document.body
	const globalLang = lang
	const popup = isMobile ?
		createTouchPopup( popupContainer ) :
		createPopup( popupContainer )
	const popupEvents = customEvents( popup )
	const last = {}
	const foundSelectorLinks = []
	const foundDetectLinks = []
	currentColorScheme = prefersColorScheme

	const showPopup = ( e, refresh = false ) => {
		e.preventDefault()
		e.stopPropagation()

		const popupId = Date.now()
		const { currentTarget } = refresh ? last : e
		const title = refresh ? last.title : decodeURIComponent( currentTarget.getAttribute( 'data-wp-title' ) || currentTarget.textContent )
		const localLang = refresh ? last.lang : currentTarget.getAttribute( 'data-wp-lang' ) || globalLang
		const pointerPosition = refresh ? last.pointerPosition : { x: e.clientX, y: e.clientY }
		const dir = getDir( localLang )

		if ( popup.element.currentTargetElement === currentTarget && !refresh ) {
			// Hovering over the same link and the popup is already open
			return
		}

		currentPopupId = popupId

		if ( popup.element.style.visibility === 'visible' ) {
			popup.hide()
		}

		popup.loading = true
		popup.dir = dir
		popup.show(
			renderLoading( isMobile, localLang, dir, currentColorScheme ),
			currentTarget,
			pointerPosition
		)

		requestPagePreview( localLang, title, ( data ) => {
			if ( popupId !== currentPopupId ) {
				return
			}
			if ( popup.loading ) {
				popup.loading = false
				if ( data ) {
					popup.lang = localLang
					popup.title = title
					if ( data.type === 'standard' ) {
						popup.show(
							renderPreview( localLang, data, isMobile, currentColorScheme ),
							currentTarget,
							pointerPosition
						)
						invokeCallback( events, 'onShow', [ title, localLang, 'standard' ] )
					} else if ( data.type === 'disambiguation' ) {
						const content = data.extractHtml ?
							renderPreview( localLang, data, isMobile, currentColorScheme ) :
							// fallback message when no extract is found on disambiguation page
							renderDisambiguation(
								isMobile,
								localLang,
								data.title,
								data.dir,
								currentColorScheme
							)
						popup.show(
							content,
							currentTarget,
							pointerPosition
						)
						invokeCallback( events, 'onShow', [ title, localLang, 'disambiguation' ] )
					}
				} else {
					if ( isOnline() ) {
						popup.show(
							renderError( isMobile, localLang, title, dir, currentColorScheme ),
							currentTarget,
							pointerPosition
						)
						invokeCallback( events, 'onShow', [ title, localLang, 'error' ] )
					} else {
						popup.show(
							renderOffline( isMobile, localLang, dir, currentColorScheme ),
							currentTarget,
							pointerPosition
						)
						invokeCallback( events, 'onShow', [ title, localLang, 'offline' ] )
						const again = document.querySelector( '.wikipediapreview-body-action' )
						last.lang = localLang
						last.title = title
						last.pointerPosition = pointerPosition
						last.target = currentTarget
						again.addEventListener( 'click', ( event ) => {
							showPopup( event, true )
						} )
					}
				}
				const readOnWikiCta = popup.element.querySelector( '.wikipediapreview-footer-cta-readonwiki, .wikipediapreview-cta-readonwiki' )
				if ( readOnWikiCta ) {
					readOnWikiCta.addEventListener( 'click', () => {
						invokeCallback( events, 'onWikiRead', [ title, localLang ] )
					} )
				}
				// add wprov to target's href
				if ( currentTarget.tagName === 'A' ) {
					const param = getAnalyticsQueryParam().split( '=' )
					const url = new URL( currentTarget.href )
					url.searchParams.set( param[ 0 ], param[ 1 ] )
					currentTarget.href = url.href
				}
			}
		} )
	}

	const onPointerUp = ( pointerEvent ) => {
		if ( pointerEvent.pointerType === 'touch' ) {
			// This click event was triggered on a touch screen
			showPopup( pointerEvent )
		}
	}

	const onPointerEnter = ( pointerEvent ) => {
		if ( pointerEvent.pointerType === 'mouse' ) {
			// This hover event was triggered by a mouse
			showPopup( pointerEvent )
		}
	}

	const registerPreviewEvents = ( node ) => {
		node.addEventListener( 'pointerup', onPointerUp )
		node.addEventListener( 'pointerenter', onPointerEnter )
	}

	forEachRoot( root, ( localRoot ) => {
		Array.prototype.forEach.call(
			localRoot.querySelectorAll( selector ),
			( node ) => {
				registerPreviewEvents( node )
				foundSelectorLinks.push( {
					text: node.textContent,
					title: node.getAttribute( 'data-wp-title' ) || node.textContent,
					lang: node.getAttribute( 'data-wp-lang' ) || globalLang
				} )
			}
		)
	} )

	if ( detectLinks ) {
		forEachRoot( root, ( localRoot ) => {
			Array.prototype.forEach.call(
				localRoot.querySelectorAll( 'a' ),
				( node ) => {
					const matches = getWikipediaAttrFromUrl( node.getAttribute( 'href' ) )
					if ( matches ) {
						node.setAttribute( 'data-wp-title', matches.title )
						node.setAttribute( 'data-wp-lang', matches.lang )
						registerPreviewEvents( node )

						foundDetectLinks.push( {
							text: node.textContent,
							title: matches.title,
							lang: matches.lang
						} )
					}
				}
			)
		} )
	}

	popup.subscribe( popupEvents )

	if ( debug ) {
		/* eslint-disable no-console */
		console.group( 'Wikipedia Preview [debug mode]' )
		console.group( `Searching for "${ selector }" inside ${ root }, Total links found: ${ foundSelectorLinks.length }` )
		foundSelectorLinks.forEach( ( link, index ) => {
			console.log( index + 1, `${ link.text } -> ${ decodeURI( buildWikipediaUrl( link.lang, link.title, isMobile, false ) ) }` )
		} )
		console.groupEnd()
		if ( detectLinks ) {
			console.group( `Searching for links to Wikipedia, Total links found: ${ foundDetectLinks.length }` )
			foundDetectLinks.forEach( ( link, index ) => {
				console.log( index + 1, `${ link.text } -> ${ decodeURI( buildWikipediaUrl( link.lang, link.title, isMobile, false ) ) }` )
			} )
			console.groupEnd()
		}
		console.groupEnd()
		/* eslint-enable no-console */
	}

}

version()

export default { init, version, getPreviewHtml, getSections }
