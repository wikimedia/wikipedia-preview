import '../style/popup.less'

let popup
let originalOverflow

const addBackgroundScreen = ( document ) => {
	if ( !document.querySelector( '.wp-dark-screen' ) ) {
		const screen = document.createElement( 'div' )
		screen.classList.add( 'wp-dark-screen' )
		document.body.appendChild( screen )
		originalOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
	}
}

const removeBackgroundScreen = ( document ) => {
	const screen = document.getElementsByClassName( 'wp-dark-screen' )
	document.body.removeChild( screen[ 0 ] )
	document.body.style.overflow = originalOverflow
}

const createTouchPopup = ( container, win = window ) => {
	if ( !popup ) {
		popup = win.document.createElement( 'div' )
		popup.classList.add( 'wp-touch-popup' )
		popup.style.visibility = 'hidden'
		container.appendChild( popup )
	}

	const popupEvents = {/* onShow, onHide */}

	const show = ( content ) => {
		popup.innerHTML = content
		popup.style.visibility = 'visible'
		addBackgroundScreen( win.document )

		if ( popupEvents.onShow ) {
			popupEvents.onShow( popup )
		}
	}

	const hide = () => {
		if ( popupEvents.onHide ) {
			popupEvents.onHide( popup )
		}

		popup.style.visibility = 'hidden'
		removeBackgroundScreen( win.document )
	}

	const expand = () => {
		if ( popupEvents.onExpand ) {
			popupEvents.onExpand()
		}
	}

	const subscribe = ( events = {} ) => {
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
