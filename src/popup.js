
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
	let currentTargetElement
	if (!popup) {
		popup = win.document.createElement('div')
		popup.setAttribute('dir', 'ltr')
		popup.classList.add('wp-popup')
		popup.style.visibility = 'hidden'
		container.appendChild(popup)
	}

	const onMouseLeave = e => {
		const toElement = e.toElement || e.relatedTarget
		if (toElement !== currentTargetElement && !popup.contains(toElement)) {
			close()
		}
	}

	const onExpand = () => {
		popup.element.wikipediapreviews.classList.add('expanded')
	}

	const close = () => {
		popup.style.visibility = 'hidden'
		closeAllEvents()
	}

	const closeAllEvents = () => {
		if (currentTargetElement) {
			currentTargetElement.removeEventListener('mouseleave', onMouseLeave)
			currentTargetElement = null
		}

		popup.element.closeBtn.removeEventListener('click', close)
		popup.element.readMore.removeEventListener('click', onExpand)
	}

	popup.addEventListener('mouseleave', onMouseLeave)

	const show = (content, nextTo) => {
		popup.innerHTML = content
		popup.element = {
			wikipediapreviews: popup.querySelector('.wikipediapreviews'),
			closeBtn: popup.querySelector('.wikipediapreviews-header-closebtn'),
			readMore: popup.querySelector('.wikipediapreviews-footer-cta-readmore')
		}

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

		currentTargetElement = nextTo
		currentTargetElement.addEventListener('mouseleave', onMouseLeave)

		popup.style.visibility = 'visible'
	
		popup.element.closeBtn.addEventListener('click', close)
		popup.element.readMore.addEventListener('click', onExpand)
	}

	return { show, close }
}

export { createPopup, computePopupPosition }
