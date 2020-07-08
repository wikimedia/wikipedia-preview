import '../style/popup.less'

let popup

const addBackgroundScreen = ( document ) => {
		const screen = document.createElement( 'div' )
		screen.classList.add( 'wp-dark-screen' )
		document.body.appendChild( screen )
		document.body.style.overflow = 'hidden'
	},

	removeBackgroundScreen = ( document ) => {
		const screen = document.getElementsByClassName( 'wp-dark-screen' )
		document.body.removeChild( screen[ 0 ] )
		document.body.style.overflow = 'scroll'
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

export { createTouchPopup }
