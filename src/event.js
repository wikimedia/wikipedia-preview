import { isTouch } from './utils'

export const customEvents = popup => {

	var eventListenerStack = [],
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
			popup.element.component.wikipediapreviews.classList.add( 'expanded' )
		},

		onTouchStart = e => {
			const toElement = e.target
			if ( !popup.element.contains( toElement ) ) {
				popup.hide()
			}
		},

		onHide = () => {
			clearAllEventListener()
			clearAllTimeout()
		},

		onShow = element => {
			element.component = {
				wikipediapreviews: element.querySelector( '.wikipediapreviews' ),
				closeBtn: element.querySelector( '.wikipediapreviews-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreviews-footer-cta-readmore' ),
				content: element.querySelector( '.wikipediapreviews-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			addEventListener( element.component.closeBtn, 'click', popup.hide )
			addEventListener( element.component.readMore, 'click', onExpand )

			if ( isTouch ) {
				addEventListener( document, 'touchstart', onTouchStart, true )
			} else {
				addEventListener( element, 'mouseleave', onMouseLeave )
				addEventListener( element.currentTargetElement, 'mouseleave', onMouseLeave )
			}
		}

	return { onHide, onShow, onExpand }
}
