import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation } from './preview'
import { getWikipediaAttrFromUrl, isTouch, getDir } from './utils'

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
		showPopup = e => {
			e.preventDefault()
			if ( popup.element.style.visibility === 'visible' ) {
				popup.hide()
			}
			const { target } = e,
				title = target.getAttribute( 'data-wp-title' ) || target.textContent,
				lang = target.getAttribute( 'data-wp-lang' ) || globalLang,
				pointerPosition = { x: e.clientX, y: e.clientY },
				dir = getDir( lang )

			popup.loading = true
			popup.dir = dir
			popup.show( renderLoading( isTouch, lang, dir ), target, pointerPosition )

			requestPagePreview( lang, title, isTouch, data => {
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
						popup.show(
							renderError( isTouch, lang, title, dir ),
							target,
							pointerPosition
						)
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
