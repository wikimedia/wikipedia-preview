
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

	const onMouseLeave = ({toElement}) => {
		if (toElement !== currentTargetElement && !popup.contains(toElement)) {
			popup.style.visibility = 'hidden'
			if (currentTargetElement) {
				currentTargetElement.removeEventListener('mouseleave', onMouseLeave)
				currentTargetElement = null
			}
		}
	}

	popup.addEventListener('mouseleave', onMouseLeave);

	const show = (content, nextTo) => {
		popup.innerHTML = content
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
		popup.style.left = withPx(position.left);
		popup.style.right = withPx(position.right);
		popup.style.top = withPx(position.top);
		popup.style.bottom = withPx(position.bottom);

		currentTargetElement = nextTo
		currentTargetElement.addEventListener('mouseleave', onMouseLeave);

		popup.style.visibility = 'visible'
	}

	return { show }
}

export { createPopup, computePopupPosition }
