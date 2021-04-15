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
	const globalLang = lang,
		popup = isTouch ?
			createTouchPopup( popupContainer ) :
			createPopup( popupContainer ),
		popupEvents = customEvents( popup ),
		last = {},
		foundSelectorLinks = [],
		foundDetectLinks = [],
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
						invokeCallback( events, 'onWikiRead', [ title, lang ] )
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

			foundSelectorLinks.push( {
				text: node.textContent,
				title: node.getAttribute( 'data-wp-title' ) || node.textContent,
				lang: node.getAttribute( 'data-wp-lang' ) || globalLang
			} )
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

					foundDetectLinks.push( {
						text: node.textContent,
						title: matches.title,
						lang: matches.lang
					} )
				}
			}
		)
	}

	if ( debug ) {
		/* eslint-disable no-console */
		console.group( 'Wikipedia Preview [debugger]' )
		console.log( `searching for the content in language "${globalLang}" within the selector of "${selector}"` )
		console.group( `Total links found in the given selector of "${selector}" : ${foundSelectorLinks.length}` )
		foundSelectorLinks.forEach( ( link, index ) => {
			console.log( index + 1, `text "${link.text}", title "${link.title}", lang : "${link.lang}"` )
		} )
		console.groupEnd()
		if ( detectLinks ) {
			console.group( `Total links found in the hyperlink : ${foundDetectLinks.length}` )
			foundDetectLinks.forEach( ( link, index ) => {
				console.log( index + 1, `text "${link.text}", title "${link.title}", lang : "${link.lang}"` )
			} )
			console.groupEnd()
		}
		console.groupEnd()
		/* eslint-enable no-console */
	}

}

version()

export { init, version }
