import { computePosition, autoPlacement, arrow } from '@floating-ui/dom'
import '../style/popup.less'

let popup, arrowEl

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

		// arrow
		arrowEl = win.document.createElement( 'div' )
		arrowEl.classList.add( 'wp-arrow' )
		container.appendChild( arrowEl )
	}

	const popupEvents = {/* onShow, onHide */}

	const hide = () => {
		if ( popupEvents.onHide ) {
			popupEvents.onHide( popup )
		}
		popup.style.visibility = 'hidden'
		popup.currentTargetElement = null
	}

	const show = ( content, nextTo ) => {
		popup.innerHTML = content

		computePosition( nextTo, popup, {
			middleware: [ autoPlacement(), arrow( { element: arrowEl } ) ]
		}
		).then( ( { x, y, middlewareData } ) => {
			const { x: arrowX, y: arrowY } = middlewareData.arrow

			popup.style.left = withPx( x )
			popup.style.top = withPx( y )
			// popup.style.bottom = withPx( position.bottom )
			arrowEl.style.left = arrowX !== null ? withPx( arrowX ) : ''
			arrowEl.style.top = arrowY !== null ? withPx( arrowY ) : ''

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
