
import { isMobileDevice } from './const'

const computePopupPosition = (
	targetRect, popupWidth, scrollX, scrollY, innerWidth, innerHeight
) => {
	let left, right='', top='', bottom=''

	left = targetRect.x > (innerWidth/2) ?
		(scrollX + targetRect.right - popupWidth) :
		(scrollX + targetRect.left)

	if (targetRect.y > (innerHeight/2)) {
		bottom = (innerHeight - targetRect.top - scrollY)
	} else {
		top = (scrollY + targetRect.bottom)
	}
	return {left, right, top, bottom}
}

const withPx = (value) => {
	return value ? (value + 'px') : value
}

let popup

const createPopup = (container, win=window) => {
	if (!popup) {
		popup = win.document.createElement('div')
		popup.setAttribute('dir', 'ltr')
		popup.classList.add('wp-popup', isMobileDevice ? 'mobile' : 'desktop')
		popup.style.visibility = 'hidden'
		container.appendChild(popup)
	}

	const popupEvents = {/* onShow, onHide */}

	const destroy = (e, force = false)  => {
		const toElement = e.toElement || e.relatedTarget || e.target
		if (force || ( toElement !== popup.currentTargetElement && !popup.contains(toElement))) {
			if ( popupEvents.onhide ) {
				popupEvents.onHide(popup)
			}
			popup.style.visibility = 'hidden'
			popup.currentTargetElement = null
		}
	}

	const show = (content, nextTo) => {
		popup.innerHTML = content

		if ( !isMobileDevice ) {
			const scrollX = (win.pageXOffset !== undefined)
			? win.pageXOffset
			: (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollLeft

			const scrollY = (win.pageYOffset !== undefined)
				? win.pageYOffset
				: (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollTop

			const position = computePopupPosition(
				nextTo.getBoundingClientRect(),
				popup.offsetWidth,
				scrollX,
				scrollY,
				win.innerWidth,
				win.innerHeight
			);
			popup.style.left = withPx(position.left)
			popup.style.right = withPx(position.right)
			popup.style.top = withPx(position.top)
			popup.style.bottom = withPx(position.bottom)
		}

		popup.currentTargetElement = nextTo
		popup.style.visibility = 'visible'
	
		if ( popupEvents.onShow ) {
			popupEvents.onShow( popup )
		}
	}

	const subscribe = ( events = {} ) => {
		if ( events.onShow ) {
			popupEvents.onShow = events.onShow
		}
		if ( events.onHide ) {
			popupEvents.onHide = events.onHide
		}
	}

	return { show, destroy, subscribe }
}

export { createPopup, computePopupPosition }
