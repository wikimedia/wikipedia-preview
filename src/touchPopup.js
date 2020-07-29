import '../style/popup.less'

let popup,
	originalOverflow

const addBackgroundScreen = ( document ) => {
		if ( !document.querySelector( '.wp-dark-screen' ) ) {
			const screen = document.createElement( 'div' )
			screen.classList.add( 'wp-dark-screen' )
			document.body.appendChild( screen )
			originalOverflow = document.body.style.overflow
			document.body.style.overflow = 'hidden'
		}
	},

	removeBackgroundScreen = ( document ) => {
		const screen = document.getElementsByClassName( 'wp-dark-screen' )
		document.body.removeChild( screen[ 0 ] )
		document.body.style.overflow = originalOverflow
	},

	createTouchPopup = ( container, win = window ) => {
		if ( !popup ) {
			popup = win.document.createElement( 'div' )
			popup.setAttribute( 'dir', 'ltr' )
			popup.classList.add( 'wp-touch-popup' )
			popup.style.visibility = 'hidden'
			container.appendChild( popup )
		}

		const popupEvents = {/* onShow, onHide */},

			show = ( content ) => {
				popup.innerHTML = content
				popup.style.visibility = 'visible'
				addBackgroundScreen( win.document )

				if ( popupEvents.onShow ) {
					popupEvents.onShow( popup )
				}
			},

			hide = () => {
				if ( popupEvents.onHide ) {
					popupEvents.onHide( popup )
				}

				popup.style.visibility = 'hidden'
				removeBackgroundScreen( win.document )
			},

			expand = () => {
				if ( popupEvents.onExpand ) {
					popupEvents.onExpand()
				}
			},

			subscribe = ( events = {} ) => {
				if ( events.onShow ) {
					popupEvents.onShow = events.onShow
				}
				if ( events.onHide ) {
					popupEvents.onHide = events.onHide
				}
				if ( events.onExpand ) {
					popupEvents.onExpand = events.onExpand
				}
			}

		return { show, hide, expand, subscribe, element: popup }
	}

export { createTouchPopup }
