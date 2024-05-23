import { isTouch } from './utils'
// import { getGalleryRow } from './gallery' // Temporary until T360753
// import { requestPageMedia } from './api' // Temporary until T360753

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
			wikipediapreviewGallery: element.querySelector( '.wikipediapreview-gallery' ),
			closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
			content: element.querySelector( '.wikipediapreview-body > p' )
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

		addEventListener( element.component.body, 'scroll', ( e ) => {
			if ( e.target.scrollTop > 0 ) {
				element.component.body.classList.add( 'scrolled' )
			} else {
				element.component.body.classList.remove( 'scrolled' )
			}
		} )
	}

	return { onHide, onShow }
}
