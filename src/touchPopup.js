import '../style/touchpopup.less'

let popup

const addBackgroundScreen = () => {
	const screen = window.document.createElement('div')
	screen.classList.add('wp-dark-screen')
	document.body.appendChild(screen)
}

const removeBackgroundScreen = () => {
	const screen = window.document.getElementsByClassName('wp-dark-screen')
	document.body.removeChild(screen[0])
}

const createTouchPopup = (container, win=window) => {
	if (!popup) {
		popup = win.document.createElement('div')
		popup.setAttribute('dir', 'ltr')
		popup.classList.add('wp-touch-popup')
		popup.style.visibility = 'hidden'
		container.appendChild(popup)
  }
  
  const popupEvents = {/* onShow, onHide */}

	const show = (content) => {
		popup.innerHTML = content
    popup.style.visibility = 'visible'
		addBackgroundScreen()
    
    if ( popupEvents.onShow ) {
			popupEvents.onShow( popup )
		}
	}

	const hide = () => {
    if ( popupEvents.onHide ) {
			popupEvents.onHide(popup)
    }
    
		popup.style.visibility = 'hidden'
		removeBackgroundScreen()
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

export { createTouchPopup }