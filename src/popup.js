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

	withPx = ( value ) => {
		return value ? ( value + 'px' ) : value
	},

	createPopup = ( container, win = window ) => {
		if ( !popup ) {
			popup = win.document.createElement( 'div' )
			popup.setAttribute( 'dir', 'ltr' )
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

			show = ( content, nextTo ) => {
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
						nextTo.getBoundingClientRect(),
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
