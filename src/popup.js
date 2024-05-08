import { computePosition, autoPlacement, arrow, offset, inline, shift } from '@floating-ui/dom'
import '../style/popup.less'

let popup

const computePopupPosition = (
	targetRect,
	popupWidth, popupHeight,
	innerWidth, innerHeight
) => {
	const targetCenterX = targetRect.left + targetRect.width / 2
	const targetCenterY = targetRect.top + targetRect.height / 2
	const alignLeft = targetCenterX <= innerWidth / 2
	const popupBelowTarget = targetCenterY <= innerHeight / 2

	const left = alignLeft ?
		targetRect.left :
		targetRect.left + targetRect.width - popupWidth

	const top = popupBelowTarget ?
		targetRect.top + targetRect.height :
		''

	const bottom = popupBelowTarget ?
		'' :
		innerHeight - targetRect.top

	return { left, top, bottom }
}

const withPx = ( value ) => {
	return value ? ( value + 'px' ) : value
}

// Strangely, mouseenter often fires with the pointer slightly
// outside any element rect. Making the rects bigger by a few pixel
// ensures the pointer will be inside one of them.
/*
const expandRect = ( rect ) => {
	const delta = 3
	return {
		left: rect.left - delta,
		right: rect.right + delta,
		top: rect.top - delta,
		bottom: rect.bottom + delta
	}
}

const getTargetRect = ( element, { x, y } ) => {
	const rects = element.getClientRects()
	for ( let i = 0; i < rects.length; i++ ) {
		const rect = expandRect( rects[ i ] )
		if ( x >= rect.left && x <= rect.right &&
			y >= rect.top && y <= rect.bottom ) {
			return rects[ i ]
		}
	}
	// fallback for unit tests
	return rects[ 0 ] || element.getBoundingClientRect()
}
*/

const createPopup = ( container, win = window ) => {
	if ( !popup ) {
		popup = win.document.createElement( 'div' )
		popup.classList.add( 'wp-popup' )
		popup.style.visibility = 'hidden'
		container.appendChild( popup )
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
		popup.innerHTML = content
		const arrowEl = popup.querySelector( '.wikipediapreview-arrow' )

		computePosition( nextTo, popup, {
			middleware: [
				inline( { x: mouseX, y: mouseY } ),
				shift(),
				autoPlacement(),
				offset( 10 ),
				arrow( { element: arrowEl } )
			]
		} ).then( ( { x, y, middlewareData, placement } ) => {
			// popup
			popup.style.top = withPx( y )
			popup.style.left = withPx( x )

			// arrow
			if ( middlewareData.arrow ) {
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

	return { show, hide, subscribe, element: popup }
}

export { createPopup, computePopupPosition }
