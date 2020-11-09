import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from './preview'
import { getWikipediaAttrFromUrl, isTouch, getDir, isOnline } from './utils'

let currentPopupId

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body } ) {
	const globalLang = lang,
		popup = isTouch ?
			createTouchPopup( popupContainer ) :
			createPopup( popupContainer ),
		events = customEvents( popup ),
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
						} else if ( data.type === 'disambiguation' ) {
							popup.show(
								renderDisambiguation( isTouch, lang, data.title, data.dir ),
								target,
								pointerPosition
							)
						}
					} else {
						if ( isOnline() ) {
							popup.show(
								renderError( isTouch, lang, title, dir ),
								target,
								pointerPosition
							)
						} else {
							popup.show(
								renderOffline( isTouch, lang, dir ),
								target,
								pointerPosition
							)
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
				}
			} )
		}

	popup.subscribe( events )

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
