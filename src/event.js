import { isTouch } from './utils'
import { getGalleryRow } from './gallery'
import { requestPageMedia } from './api'

export const customEvents = popup => {

	let eventListenerStack = []
	let timeoutStack = []

	const addTimeout = ( func, timeout ) => {
		const id = setTimeout( func, timeout )
		timeoutStack.push( id )
		return id
	}

	const clearAllTimeout = () => {
		timeoutStack.forEach( timeoutId => {
			clearTimeout( timeoutId )
		} )
		timeoutStack = []
	}

	const addEventListener = ( target, type, listener, options = undefined ) => {
		target.addEventListener( type, listener, options )
		eventListenerStack.push( [ target, type, listener, options ] )
	}

	const clearAllEventListener = () => {
		eventListenerStack.forEach( eventListener => {
			const [ target, type, listener, options ] = eventListener
			target.removeEventListener( type, listener, options )
		} )
		eventListenerStack = []
	}

	const onMouseLeave = e => {
		const toElement = e.toElement || e.relatedTarget || e.target
		const previewElement = popup.element.currentTargetElement

		if ( toElement !== previewElement && !popup.element.contains( toElement ) ) {
			let timeoutId
			const persistPopup = () => {
				clearTimeout( timeoutId )
			}

			timeoutId = addTimeout( popup.hide, 300 )
			addEventListener( popup.element, 'mouseenter', persistPopup )
		}
	}

	const setPreviewMaxHeight = max => {
		const bodyElement = popup.element.querySelector( '.wikipediapreview-body' )
		const headerElement = popup.element.querySelector( '.wikipediapreview-header' )
		const footerElement = popup.element.querySelector( '.wikipediapreview-footer-cta' ) || popup.element.querySelector( '.wikipediapreview-footer-loading' )

		if ( !bodyElement ) {
			return
		}

		if ( popup.element.style[ 2 ] === 'bottom' || popup.element.style.bottom ) {
			// expand up
			const currentTop = popup.element.getBoundingClientRect().top
			const originalHeight = parseInt(
				window.getComputedStyle( bodyElement ).maxHeight.slice( 0, -2 )
			)

			bodyElement.style.maxHeight = Math.min( max, originalHeight + currentTop ) + 'px'
		} else {
			// expand down
			const currentTop = popup.element.getBoundingClientRect().top
			const headerHeight = window.getComputedStyle( headerElement ).height.slice( 0, -2 )
			const footerHeight = footerElement ?
				window.getComputedStyle( footerElement ).height.slice( 0, -2 ) : 0
			const availableHeight = window.innerHeight - currentTop - headerHeight - footerHeight

			bodyElement.style.maxHeight = Math.min( max, availableHeight ) + 'px'
		}
	}

	const onExpand = () => {
		const maxHeight = 496
		const { lang, title } = popup

		popup.element.component.wikipediapreview.classList.add( 'expanded' )

		if ( !isTouch ) {
			setPreviewMaxHeight( maxHeight )
		}

		if ( !popup.loading && lang && title ) {
			requestPageMedia( lang, title, ( mediaData ) => {
				const galleryContainer = popup.element.component.wikipediapreviewGallery
				if ( mediaData && mediaData.length > 0 ) {
					galleryContainer.appendChild( getGalleryRow( mediaData, popup ) )
				} else {
					popup.element.component.body.removeChild( galleryContainer )
				}
			} )
		}
	}

	const applyDragEvent = ( element ) => {
		let initialY
		let finalY
		let previewBodyStyle
		let initialHeight

		const previewHeader = element.querySelector( '.wikipediapreview-header' )
		const previewBody = element.querySelector( '.wikipediapreview-body' )
		const handleTouchStart = ( e ) => {
			initialY = e.touches[ 0 ].clientY
			previewBodyStyle = window.getComputedStyle( previewBody )
			initialHeight = Number( previewBodyStyle.height.slice( 0, -2 ) )
		}

		const handleTouchMove = ( e, isHeader ) => {
			if ( isHeader ) {
				e.preventDefault()
			}

			const clientY = e.touches[ 0 ].clientY
			const offset = initialY - clientY
			const currentHeight = initialHeight + offset
			const expanded = element.querySelector( '.wikipediapreview.expanded' )
			const isNotExpandedBody = !expanded && !isHeader || isHeader

			previewBody.style.transition = 'auto'
			finalY = clientY
			if ( isNotExpandedBody ) {
				previewBody.style.maxHeight = currentHeight + 'px'
			}
		}

		const handleTouchEnd = ( isHeader ) => {
			const expanded = element.querySelector( '.wikipediapreview.expanded' )
			const delta = initialY - finalY
			const isOverThreshold = Math.abs( delta ) > 80
			const isNotExpandedBody = !expanded && !isHeader || isHeader

			previewBody.style.transition = 'all 0.25s ease-in-out'
			if ( delta < 0 && isOverThreshold && isNotExpandedBody ) {
				popup.hide()
			} else if ( delta > 0 && isOverThreshold && isNotExpandedBody && !expanded ) {
				previewBody.style.maxHeight = '70vh'
				onExpand()
			} else {
				previewBody.style.maxHeight = initialHeight + 'px'
			}
		}

		addEventListener( previewBody, 'touchstart', handleTouchStart )
		addEventListener( previewBody, 'touchmove', e => {
			handleTouchMove( e, false )
		} )
		addEventListener( previewBody, 'touchend', () => handleTouchEnd( false ) )

		addEventListener( previewHeader, 'touchstart', handleTouchStart )
		addEventListener( previewHeader, 'touchmove', e => {
			handleTouchMove( e, true )
		} )
		addEventListener( previewHeader, 'touchend', () => handleTouchEnd( true ) )
	}

	const onHide = () => {
		popup.element.component.wikipediapreview.classList.remove( 'expanded' )
		popup.lang = null
		popup.title = null
		popup.loading = false

		const previewBody = popup.element.querySelector( '.wikipediapreview-body' )
		previewBody.style.transition = 'auto'

		clearAllEventListener()
		clearAllTimeout()
	}

	const onShow = ( element ) => {
		element.component = {
			body: element.querySelector( '.wikipediapreview-body' ),
			wikipediapreview: element.querySelector( '.wikipediapreview' ),
			wikipediapreviewGallery: element.querySelector( '.wikipediapreview-gallery' ),
			closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
			readMore: element.querySelector( '.wikipediapreview-footer-cta-readmore' ),
			content: element.querySelector( '.wikipediapreview-body > p' )
		}

		// @todo update the magic number
		if ( element.component.content &&
			element.component.content.getBoundingClientRect().height < 248 ) {
			onExpand( element )
		} else {
			if ( !isTouch ) {
				setPreviewMaxHeight( 248 )
			}
		}

		addEventListener( element.component.closeBtn, 'click', popup.hide )
		if ( element.component.readMore ) {
			addEventListener( element.component.readMore, 'click', onExpand )
		}

		if ( isTouch ) {
			const darkScreen = document.querySelector( '.wp-dark-screen' )
			addEventListener( darkScreen, 'click', popup.hide, true )
			applyDragEvent( element )
		} else {
			addEventListener( element, 'mouseleave', onMouseLeave )
			addEventListener( element.currentTargetElement, 'mouseleave', onMouseLeave )
		}
	}

	return { onHide, onShow, onExpand }
}
