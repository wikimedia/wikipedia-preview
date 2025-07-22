import { computePosition, autoPlacement, arrow, offset, inline, shift } from '@floating-ui/dom'
import '../style/popup.less'
import { clearAllEventListener } from './event'

let popup, arrowElement

const dispose = () => {
	if (popup) {
		clearAllEventListener();
		if (popup.parentNode) {
			popup.parentNode.removeChild(popup);
		}
		popup = null;
		arrowElement = null;
	}
};

const withPx = ( value ) => {
	return value ? ( value + 'px' ) : value
}

const createPopup = ( container, win = window ) => {
	if ( !popup ) {
		popup = win.document.createElement( 'div' )
		popup.classList.add( 'wp-popup' )
		popup.style.visibility = 'hidden'
		container.appendChild( popup )

		arrowElement = win.document.createElement( 'div' )
		arrowElement.classList.add( 'wp-popup-arrow' )
	}

	const popupEvents = {/* onShow, onHide */}

	const hide = () => {
		if ( popupEvents.onHide ) {
			popupEvents.onHide( popup )
		}
		popup.style.visibility = 'hidden'
		popup.currentTargetElement = null
	}

	const show = ( content, nextTo, { x: mouseX, y: mouseY } ) => {
		popup.innerHTML = content + arrowElement.outerHTML

		// capture the arrow element
		const arrowEl = popup.querySelector( '.wp-popup-arrow' )

		computePosition( nextTo, popup, {
			middleware: [
				inline( { x: mouseX, y: mouseY } ),
				shift(),
				autoPlacement( {
					allowedPlacements: [ 'top', 'bottom' ]
				} ),
				offset( 10 ),
				arrow( { element: arrowEl } )
			]
		} ).then( ( { x, y, middlewareData, placement } ) => {
			// popup
			popup.style.top = withPx( y )
			popup.style.left = withPx( x )

			// arrow
			if ( middlewareData.arrow && arrowEl ) {
				const { x: arrowX, y: arrowY } = middlewareData.arrow

				arrowEl.style.left = arrowX !== null ? withPx( arrowX ) : ''
				arrowEl.style.top = arrowY !== null ? withPx( arrowY ) : ''

				if ( placement === 'left' ) {
					arrowEl.style.right = '-8px'
					arrowEl.style.transform = 'rotate(90deg)'
				} else if ( placement === 'right' ) {
					arrowEl.style.left = '-8px'
					arrowEl.style.transform = 'rotate(-90deg)'
				} else if ( placement === 'top' ) {
					arrowEl.style.bottom = '-8px'
					arrowEl.style.transform = 'rotate(180deg)'
				} else if ( placement === 'bottom' ) {
					arrowEl.style.top = '-8px'
				}
			}

			popup.currentTargetElement = nextTo
			popup.style.visibility = 'visible'

			if ( popupEvents.onShow ) {
				popupEvents.onShow( popup )
			}
		} )
	}

	const subscribe = ( events = {} ) => {
		if ( events.onShow ) {
			popupEvents.onShow = events.onShow
		}
		if ( events.onHide ) {
			popupEvents.onHide = events.onHide
		}
	}

	return { show, hide, subscribe, element: popup, dispose }
}

export { createPopup }