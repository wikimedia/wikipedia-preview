import { isTouch } from './utils'
import { getGalleryRow } from './gallery'
import { requestPageMedia } from './api'

export const customEvents = popup => {

	let eventListenerStack = [],
		timeoutStack = []

	const addTimeout = ( func, timeout ) => {
			const id = setTimeout( func, timeout )
			timeoutStack.push( id )
			return id
		},

		clearAllTimeout = () => {
			timeoutStack.forEach( timeoutId => {
				clearTimeout( timeoutId )
			} )
			timeoutStack = []
		},

		addEventListener = ( target, type, listener, options = undefined ) => {
			target.addEventListener( type, listener, options )
			eventListenerStack.push( [ target, type, listener, options ] )
		},

		clearAllEventListener = () => {
			eventListenerStack.forEach( eventListener => {
				const [ target, type, listener, options ] = eventListener
				target.removeEventListener( type, listener, options )
			} )
			eventListenerStack = []
		},

		onMouseLeave = e => {
			const toElement = e.toElement || e.relatedTarget || e.target,
				previewElement = popup.element.currentTargetElement

			if ( toElement !== previewElement && !popup.element.contains( toElement ) ) {
				let timeoutId
				const persistPopup = () => {
					clearTimeout( timeoutId )
				}

				timeoutId = addTimeout( popup.hide, 300 )
				addEventListener( popup.element, 'mouseenter', persistPopup )
			}
		},

		setPreviewMaxHeight = ( max ) => {
			const bodyElement = popup.element.querySelector( '.wikipediapreview-body' )

			if ( !bodyElement ) {
				return
			}

			if ( popup.element.style[ 2 ] === 'bottom' || popup.element.style.bottom ) {
				let currentTop = popup.element.getBoundingClientRect().top,
					originalHeight = parseInt(
						window.getComputedStyle( bodyElement ).maxHeight.slice( 0, -2 )
					)
				bodyElement.style.maxHeight = Math.min( max, originalHeight + currentTop ) + 'px'
			} else {
				// expand down
				bodyElement.style.maxHeight = max + 'px'
			}
		},

		onExpand = () => {
			const maxHeight = 496,
				{ lang, title } = popup

			popup.element.component.wikipediapreview.classList.add( 'expanded' )

			if ( !isTouch ) {
				setPreviewMaxHeight( maxHeight )
			}

			if ( !popup.loading && lang && title ) {
				requestPageMedia( lang, title, mediaData => {
					const galleryContainer = popup.element.component.wikipediapreviewGallery
					if ( mediaData && mediaData.length > 0 ) {
						galleryContainer.appendChild( getGalleryRow( mediaData, popup ) )
					} else {
						popup.element.component.body.removeChild( galleryContainer )
					}
				} )
			}
		},

		applyDragEvent = ( element ) => {
			let initialY,
				finalY,
				previewBodyStyle,
				initialHeight

			const previewHeader = element.querySelector( '.wikipediapreview-header' ),
				previewBody = element.querySelector( '.wikipediapreview-body' ),
				handleTouchStart = ( e ) => {
					initialY = e.touches[ 0 ].clientY
					previewBodyStyle = window.getComputedStyle( previewBody )
					initialHeight = Number( previewBodyStyle.height.slice( 0, -2 ) )
				},

				handleTouchMove = ( e, isHeader ) => {
					if ( isHeader ) {
						e.preventDefault()
					}

					const clientY = e.touches[ 0 ].clientY,
						offset = initialY - clientY,
						currentHeight = initialHeight + offset,
						expanded = element.querySelector( '.wikipediapreview.expanded' ),
						isNotExpandedBody = !expanded && !isHeader || isHeader

					previewBody.style.transition = 'auto'
					finalY = clientY
					if ( isNotExpandedBody ) {
						previewBody.style.maxHeight = currentHeight + 'px'
					}
				},

				handleTouchEnd = ( isHeader ) => {
					const expanded = element.querySelector( '.wikipediapreview.expanded' ),
						delta = initialY - finalY,
						isOverThreshold = Math.abs( delta ) > 80,
						isNotExpandedBody = !expanded && !isHeader || isHeader

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
			addEventListener( previewBody, 'touchmove', ( e ) => {
				handleTouchMove( e, false )
			} )
			addEventListener( previewBody, 'touchend', () => handleTouchEnd( false ) )

			addEventListener( previewHeader, 'touchstart', handleTouchStart )
			addEventListener( previewHeader, 'touchmove', ( e ) => {
				handleTouchMove( e, true )
			} )
			addEventListener( previewHeader, 'touchend', () => handleTouchEnd( true ) )
		},

		onHide = () => {
			popup.element.component.wikipediapreview.classList.remove( 'expanded' )
			popup.lang = null
			popup.title = null
			popup.loading = false

			const previewBody = popup.element.querySelector( '.wikipediapreview-body' )
			previewBody.style.transition = 'auto'

			clearAllEventListener()
			clearAllTimeout()
		},

		onShow = element => {
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
