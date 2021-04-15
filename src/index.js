import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from './preview'
import { getWikipediaAttrFromUrl, isTouch, getDir, isOnline, version } from './utils'

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
	},

	Log = ( debug ) => {
		return ( ...message ) => {
			if ( !debug ) {
				return
			}
			console.log( 'Wikipedia Preview -', ...message ) // eslint-disable-line
		}
	}

let currentPopupId

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body,
	events = {},
	debug = false
} ) {
	const log = new Log( debug ),
		globalLang = lang,
		popup = isTouch ?
			createTouchPopup( popupContainer ) :
			createPopup( popupContainer ),
		popupEvents = customEvents( popup ),
		last = {},
		showPopup = ( e, refresh = false ) => {
			e.preventDefault()

			const popupId = Date.now(),
				{ target } = refresh ? last : e,
				title = refresh ? last.title : target.getAttribute( 'data-wp-title' ) || target.textContent,
				lang = refresh ? last.lang : target.getAttribute( 'data-wp-lang' ) || globalLang,
				pointerPosition = refresh ? last.pointerPosition : { x: e.clientX, y: e.clientY },
				dir = getDir( lang )

			if ( popup.element.currentTargetElement === target && !refresh ) {
				// Hovering over the same link and the popup is already open
				return
			}

			currentPopupId = popupId

			if ( popup.element.style.visibility === 'visible' ) {
				popup.hide()
			}

			popup.loading = true
			popup.dir = dir
			popup.show( renderLoading( isTouch, lang, dir ), target, pointerPosition )

			requestPagePreview( lang, title, isTouch, data => {
				if ( popupId !== currentPopupId ) {
					return
				}
				if ( popup.loading ) {
					popup.loading = false
					if ( data ) {
						popup.lang = lang
						popup.title = title
						if ( data.type === 'standard' ) {
							popup.show(
								renderPreview( lang, data, isTouch ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'standard' ] )
							log( `Show ${title} in Standard Mode` )
						} else if ( data.type === 'disambiguation' ) {
							popup.show(
								renderDisambiguation( isTouch, lang, data.title, data.dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'disambiguation' ] )
							log( `Show ${title} in Disambiguation Mode` )
						}
					} else {
						if ( isOnline() ) {
							popup.show(
								renderError( isTouch, lang, title, dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'error' ] )
							log( `Show ${title} in Error Mode` )
						} else {
							popup.show(
								renderOffline( isTouch, lang, dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'offline' ] )
							log( `Show ${title} in Offline Mode` )
							const again = root.querySelector( '.wikipediapreview-body-action' )
							last.lang = lang
							last.title = title
							last.pointerPosition = pointerPosition
							last.target = target
							again.addEventListener( 'click', ( e ) => {
								showPopup( e, true )
							} )
						}
					}
					popup.element.querySelector( '.wikipediapreview-footer-cta-readonwiki, .wikipediapreview-cta-readonwiki' ).addEventListener( 'click', () => {
						invokeCallback( events, 'onWikiRead', [ title, lang ] )
						log( `Read ${title} on Wikipedia` )
					} )
				}
			} )
		}

	popup.subscribe( popupEvents )

	Array.prototype.forEach.call(
		root.querySelectorAll( selector ),
		node => {
			if ( isTouch ) {
				node.addEventListener( 'click', showPopup )
			} else {
				node.addEventListener( 'mouseenter', showPopup )
			}
		}
	)

	if ( detectLinks ) {
		Array.prototype.forEach.call(
			root.querySelectorAll( 'a' ),
			node => {
				const matches = getWikipediaAttrFromUrl( node.getAttribute( 'href' ) )
				if ( matches ) {
					node.setAttribute( 'data-wp-title', matches.title )
					node.setAttribute( 'data-wp-lang', matches.lang )
					if ( isTouch ) {
						// eslint-disable-next-line no-script-url
						node.setAttribute( 'href', 'javascript:;' )
						node.addEventListener( 'click', showPopup )
					} else {
						node.addEventListener( 'mouseenter', showPopup )
					}
				}
			}
		)
	}

	log( 'Initialization props', { selector, lang, detectLinks } )
}

version()

export { init, version }
