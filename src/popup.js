import '../style/popup.less'

let popup

const computePopupPosition = (
		targetRect, popupWidth, scrollX, scrollY, innerWidth, innerHeight
	) => {
		let left, right = '', top = '', bottom = ''

		left = targetRect.left > ( innerWidth / 2 ) ?
			( scrollX + targetRect.right - popupWidth ) :
			( scrollX + targetRect.left )

		if ( targetRect.top > ( innerHeight / 2 ) ) {
			bottom = ( innerHeight - targetRect.top - scrollY )
		} else {
			top = ( scrollY + targetRect.bottom )
		}
		return { left, right, top, bottom }
	},

	withPx = value => {
		return value ? ( value + 'px' ) : value
	},

	// Strangely, mouseenter often fires with the pointer slightly
	// outside any element rect. Making the rects bigger by a few pixel
	// ensures the pointer will be inside one of them.
	expandRect = rect => {
		const delta = 3
		return {
			left: rect.left - delta,
			right: rect.right + delta,
			top: rect.top - delta,
			bottom: rect.bottom + delta
		}
	},

	getTargetRect = ( element, { x, y } ) => {
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
	},

	createPopup = ( container, win = window ) => {
		if ( !popup ) {
			popup = win.document.createElement( 'div' )
			popup.classList.add( 'wp-popup' )
			popup.style.visibility = 'hidden'
			container.appendChild( popup )
		}

		const popupEvents = {/* onShow, onHide */},

			hide = () => {
				if ( popupEvents.onHide ) {
					popupEvents.onHide( popup )
				}
				popup.style.visibility = 'hidden'
				popup.currentTargetElement = null
			},

			show = ( content, nextTo, pointerPosition ) => {
				popup.innerHTML = content

				const scrollX = ( win.pageXOffset !== undefined ) ?
						win.pageXOffset :
						(
							win.document.documentElement ||
							win.document.body.parentNode ||
							win.document.body
						).scrollLeft,

					scrollY = ( win.pageYOffset !== undefined ) ?
						win.pageYOffset :
						(
							win.document.documentElement ||
							win.document.body.parentNode ||
							win.document.body
						).scrollTop,
					position = computePopupPosition(
						getTargetRect( nextTo, pointerPosition ),
						popup.offsetWidth,
						scrollX,
						scrollY,
						win.innerWidth,
						win.innerHeight
					)
				popup.style.left = withPx( position.left )
				popup.style.right = withPx( position.right )
				popup.style.top = withPx( position.top )
				popup.style.bottom = withPx( position.bottom )

				popup.currentTargetElement = nextTo
				popup.style.visibility = 'visible'

				if ( popupEvents.onShow ) {
					popupEvents.onShow( popup )
				}
			},

			subscribe = ( events = {} ) => {
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
