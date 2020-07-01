import '../style/touchpopup.less'

let popup

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
    
    if ( popupEvents.onShow ) {
			popupEvents.onShow( popup )
		}
	}

	const hide = () => {
    if ( popupEvents.onHide ) {
			popupEvents.onHide(popup)
    }
    
		popup.style.visibility = 'hidden'
  }
  
  const subscribe = ( events = {} ) => {
		if ( events.onShow ) {
			popupEvents.onShow = events.onShow
		}
		if ( events.onHide ) {
			popupEvents.onHide = events.onHide
		}
	}

	return { show, hide, subscribe }
}

export { createTouchPopup }