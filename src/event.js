import { isTouch, isVerticallyScrollable } from './utils'
import { showFullscreenGallery } from './gallery/fullscreen'

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
			wikipediapreviewGalleryImages: element.querySelectorAll( '.wikipediapreview-gallery-image' ),
			closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
			content: element.querySelector( '.wikipediapreview-body > p' ),
			scrollCue: element.querySelector( '.wikipediapreview-scroll-cue' )
		}

		if ( element.component.wikipediapreviewGalleryImages ) {
			element.component.wikipediapreviewGalleryImages.forEach( ( image ) => {
				addEventListener( image, 'click', ( e ) => {
					const selected = e.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )
					showFullscreenGallery( popup.media, selected, popup.lang, popup.dir )
				} )
			} )
		}

		if ( isTouch ) {
			addEventListener( element.component.closeBtn, 'click', popup.hide )
		}

		if ( isTouch ) {
			const darkScreen = document.querySelector( '.wp-dark-screen' )
			addEventListener( darkScreen, 'click', popup.hide, true )
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
