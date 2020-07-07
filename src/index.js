import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { renderPreview } from './preview'
import { getWikipediaAttrFromUrl } from './utils'

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body } ) {
	const globalLang = lang,
		popup = createPopup( popupContainer ),
		events = customEvents( popup ),
		showPopup = ( { target } ) => {
			const title = target.getAttribute( 'data-wp-title' ) || target.textContent,
				lang = target.getAttribute( 'data-wp-lang' ) || globalLang
			requestPagePreview( lang, title, data => {
				if ( data ) {
					popup.show( renderPreview( lang, data ), target )
				}
			} )
		}

	popup.subscribe( events )

	Array.prototype.forEach.call(
		root.querySelectorAll( selector ),
		node => {
			node.addEventListener( 'mouseenter', showPopup )
		}
	)

	if ( detectLinks ) {
		Array.prototype.forEach.call(
			root.querySelectorAll( 'a' ),
			node => {
				const matches = getWikipediaAttrFromUrl( node.getAttribute( 'href' ) )
				if ( matches.title ) {
					node.setAttribute( 'data-wp-title', matches.title )
					node.setAttribute( 'data-wp-lang', matches.lang )
					node.addEventListener( 'mouseenter', showPopup )
				}
			}
		)
	}
}

export { init }
