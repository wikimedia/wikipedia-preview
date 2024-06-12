import { isMobile, isVerticallyScrollable } from './utils'
import { getGalleryRow } from './gallery'
import { requestPageMedia } from './api'

export const customEvents = ( popup ) => {

	let eventListenerStack = []
	let timeoutStack = []

	const addTimeout = ( func, timeout ) => {
		const id = setTimeout( func, timeout )
		timeoutStack.push( id )
		return id
	}

	const clearAllTimeout = () => {
		timeoutStack.forEach( ( timeoutId ) => {
			clearTimeout( timeoutId )
		} )
		timeoutStack = []
	}

	const addEventListener = ( target, type, listener, options = undefined ) => {
		target.addEventListener( type, listener, options )
		eventListenerStack.push( [ target, type, listener, options ] )
	}

	const clearAllEventListener = () => {
		eventListenerStack.forEach( ( eventListener ) => {
			const [ target, type, listener, options ] = eventListener
			target.removeEventListener( type, listener, options )
		} )
		eventListenerStack = []
	}

	const appendGalleryRow = () => {
		const { lang, title } = popup

		if ( !popup.loading && lang && title ) {
			requestPageMedia( lang, title, ( mediaData ) => {
				const galleryContainer = popup.element.component.wikipediapreviewGallery
				if ( mediaData && mediaData.length > 0 ) {
					galleryContainer.appendChild( getGalleryRow( mediaData, popup ) )
				} else {
					popup.element.component.body.removeChild( galleryContainer )
					if ( !isVerticallyScrollable( popup.element.component.body ) ) {
						popup.element.component.scrollCue.remove()
					}
				}
			} )
		}
	}

	const onMouseLeave = ( e ) => {
		const toElement = e.toElement || e.relatedTarget || e.target
		const previewElement = popup.element.currentTargetElement

		if ( toElement !== previewElement && !popup.element.contains( toElement ) ) {
			const timeoutId = addTimeout( popup.hide, 300 )
			const persistPopup = () => {
				clearTimeout( timeoutId )
			}

			addEventListener( popup.element, 'mouseenter', persistPopup )
		}
	}

	const onHide = () => {
		popup.lang = null
		popup.title = null
		popup.loading = false

		const previewBody = popup.element.querySelector( '.wikipediapreview-body' )
		previewBody.style.transition = 'auto'

		clearAllEventListener()
		clearAllTimeout()
	}

	const onShow = ( element ) => {
		element.component = {
			body: element.querySelector( '.wikipediapreview-body' ),
			wikipediapreview: element.querySelector( '.wikipediapreview' ),
			wikipediapreviewGallery: element.querySelector( '.wikipediapreview-gallery' ),
			closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
			content: element.querySelector( '.wikipediapreview-body > p' ),
			scrollCue: element.querySelector( '.wikipediapreview-scroll-cue' )
		}

		if ( element.component.wikipediapreviewGallery &&
			element.component.wikipediapreviewGallery.children.length === 0 ) {
			appendGalleryRow()
		}

		if ( isMobile ) {
			addEventListener( element.component.closeBtn, 'click', popup.hide )
		}

		if ( isMobile ) {
			const darkScreen = document.querySelector( '.wp-dark-screen' )
			addEventListener( darkScreen, 'touch', popup.hide, true )
		} else {
			addEventListener( element, 'mouseleave', onMouseLeave )
			addEventListener( element.currentTargetElement, 'mouseleave', onMouseLeave )
		}

		if ( element.component.scrollCue ) {
			if ( isVerticallyScrollable( element.component.body ) ) {
				addEventListener( element.component.body, 'scroll', ( e ) => {
					if ( e.target.scrollTop > 0 ) {
						element.component.scrollCue.remove()
					}
				} )
			} else {
				element.component.scrollCue.remove()
			}
		}
	}

	return { onHide, onShow }
}
