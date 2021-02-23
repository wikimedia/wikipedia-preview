import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from './preview'
import { getWikipediaAttrFromUrl, isTouch, getDir, isOnline } from './utils'

const invokeCallback = ( events, name, ...params ) => {
	const callback = events && events[ name ]
	if ( callback instanceof Function ) {
		try {
			callback.apply( null, params )
		} catch ( e ) {
			// we don't care about buggy 3rd party functions
		}
	}
}

let currentPopupId

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body,
	events = {}
} ) {
	const globalLang = lang,
		popup = isTouch ?
			createTouchPopup( popupContainer ) :
			createPopup( popupContainer ),
		popupEvents = customEvents( popup ),
		last = {},
		showPopup = ( e, refresh = false ) => {
			e.preventDefault()
			if ( popup.element.style.visibility === 'visible' ) {
				popup.hide()
			}
			const popupId = currentPopupId = Date.now(),
				{ target } = refresh ? last : e,
				title = refresh ? last.title : target.getAttribute( 'data-wp-title' ) || target.textContent,
				lang = refresh ? last.lang : target.getAttribute( 'data-wp-lang' ) || globalLang,
				pointerPosition = refresh ? last.pointerPosition : { x: e.clientX, y: e.clientY },
				dir = getDir( lang )

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
						} else if ( data.type === 'disambiguation' ) {
							popup.show(
								renderDisambiguation( isTouch, lang, data.title, data.dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'disambiguation' ] )
						}
					} else {
						if ( isOnline() ) {
							popup.show(
								renderError( isTouch, lang, title, dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'error' ] )
						} else {
							popup.show(
								renderOffline( isTouch, lang, dir ),
								target,
								pointerPosition
							)
							invokeCallback( events, 'onShow', [ title, lang, 'offline' ] )
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
						invokeCallback( events, 'onReadOnWiki', [ title, lang ] )
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
}

export { init }
