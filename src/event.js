import { isTouch } from './utils'
import { getGalleryRow } from './gallery'
import { requestPageMedia } from './api'

export const customEvents = popup => {

	let eventListenerStack = [],
		timeoutStack = []

	const addTimeout = ( func, timeout ) => {
			const id = setTimeout( func, timeout )
			timeoutStack.push( id )
			return id
		},

		clearAllTimeout = () => {
			timeoutStack.forEach( timeoutId => {
				clearTimeout( timeoutId )
			} )
			timeoutStack = []
		},

		addEventListener = ( target, type, listener, options = undefined ) => {
			target.addEventListener( type, listener, options )
			eventListenerStack.push( [ target, type, listener, options ] )
		},

		clearAllEventListener = () => {
			eventListenerStack.forEach( eventListener => {
				const [ target, type, listener, options ] = eventListener
				target.removeEventListener( type, listener, options )
			} )
			eventListenerStack = []
		},

		onMouseLeave = e => {
			const toElement = e.toElement || e.relatedTarget || e.target,
				previewElement = popup.element.currentTargetElement

			if ( toElement !== previewElement && !popup.element.contains( toElement ) ) {
				let timeoutId
				const persistPopup = () => {
					clearTimeout( timeoutId )
				}

				timeoutId = addTimeout( popup.hide, 300 )
				addEventListener( popup.element, 'mouseenter', persistPopup )
			}
		},

		onExpand = () => {
			popup.element.component.wikipediapreview.classList.add( 'expanded' )

			const lang = popup.lang,
				title = popup.title

			if ( lang && title ) {
				requestPageMedia( lang, title, mediaData => {
					if ( mediaData && mediaData.length > 0 ) {
						const galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' )
						galleryContainer.appendChild( getGalleryRow( mediaData, popup ) )
					}
				} )
			}
		},

		onHide = () => {
			popup.element.component.wikipediapreview.classList.remove( 'expanded' )
			popup.lang = null
			popup.title = null
			popup.loading = false

			clearAllEventListener()
			clearAllTimeout()
		},

		onShow = element => {
			element.component = {
				wikipediapreview: element.querySelector( '.wikipediapreview' ),
				wikipediapreviewGallery: element.querySelector( '.wikipediapreview-gallery' ),
				closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreview-footer-cta-readmore' ),
				content: element.querySelector( '.wikipediapreview-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content &&
				element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			addEventListener( element.component.closeBtn, 'click', popup.hide )
			if ( element.component.readMore ) {
				addEventListener( element.component.readMore, 'click', onExpand )
			}

			if ( isTouch ) {
				const darkScreen = document.querySelector( '.wp-dark-screen' )
				addEventListener( darkScreen, 'touchstart', popup.hide, true )
			} else {
				addEventListener( element, 'mouseleave', onMouseLeave )
				addEventListener( element.currentTargetElement, 'mouseleave', onMouseLeave )
			}
		}

	return { onHide, onShow, onExpand }
}
