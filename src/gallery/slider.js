import { msg } from '../i18n'
import { requestPageMediaInfo } from '../api'
import { isOnline, getLinkIconSvg } from '../utils'
import { temp, isInvalidEvent, isImgZoomedIn, getFingerAmount, toggleZoom, clearZoom, zoomStart, zoomMove, zoomScroll, zoomEnd, slideStart, slideMove, slideEnd } from './gestures'
import { addEventListener } from './event'

// internal state of the slider component
let current = 0
let dir = ''
let lang
let gallery
let parentContainer

const getClientWidth = () => window.innerWidth
const prefixClassname = 'wp-gallery-fullscreen-slider'

const renderImageSlider = ( givenLang, givenDir, container, images = [], selectedImage = '' ) => {
	const imageListHtml = images.map( () => `
		<div class="${ prefixClassname }-item">
				<div class="${ prefixClassname }-item-loading">
						<div class="${ prefixClassname }-item-loading-spinner">
								<div class="${ prefixClassname }-item-loading-spinner-animation">
										<div class="${ prefixClassname }-item-loading-spinner-animation-bounce"></div>
								</div>
						</div>
						<div class="${ prefixClassname }-item-loading-text">${ msg( givenLang, 'gallery-loading-still' ) }</div>
				</div>
				<div class="${ prefixClassname }-item-loading-error">
					<div class="${ prefixClassname }-item-loading-error-text">${ msg( givenLang, 'gallery-loading-error' ) }</div>
					<div class="${ prefixClassname }-item-loading-error-refresh">${ msg( givenLang, 'gallery-loading-error-refresh' ) }</div>
				</div>
		</div>
		`.trim()
	).join( '' )

	images.some( ( image, index ) => {
		if ( image.thumb === selectedImage ) {
			current = index
			return true
		}
		return false
	} )
	dir = givenDir
	lang = givenLang
	gallery = images
	parentContainer = container

	return `
		<div class="${ prefixClassname }" style="${ dir === 'ltr' ? 'margin-left' : 'margin-right' }:-${ current * getClientWidth() }px">
				<div class="${ prefixClassname }-button previous"></div>
				<div class="${ prefixClassname }-button next"></div>
				${ imageListHtml }
		</div>
		`.trim()
}

const renderImageAttribution = ( mediaInfo ) => {
	const author = mediaInfo.author ? mediaInfo.author : msg( lang, 'gallery-unknown-author' )
	const link = mediaInfo.filePage

	return `
		<div class="${ prefixClassname }-item-attribution">
			<div class="${ prefixClassname }-item-attribution-info">
				<bdi class="${ prefixClassname }-item-attribution-info-author">${ author } (${ mediaInfo.license })</bdi>
				<a href="${ link }" class="${ prefixClassname }-item-attribution-info-link" target="_blank">${ msg( lang, 'gallery-attribution-learnmore' ) } ${ getLinkIconSvg() }</a>
			</div>
		</div>
	`.trim()
}

const handleCaptionExpansion = ( item, forceClose = false ) => {
	const caption = item.querySelector( `.${ prefixClassname }-item-caption` )
	const expandCue = item.querySelector( `.${ prefixClassname }-item-caption-expand-cue` )
	const expanded = item.querySelector( '.expanded' )

	if ( expandCue && expanded || forceClose && expandCue ) {
		expandCue.classList.remove( 'expanded' )
		caption.style.maxHeight = '95px'
	} else if ( expandCue ) {
		expandCue.classList.add( 'expanded' )
		caption.style.maxHeight = '241px'
	}
}

const bindImageEvent = ( container, refresh = false ) => {
	const imageElement = container.querySelector( 'img' )
	const loading = container.querySelector( `.${ prefixClassname }-item-loading` )
	const errorElement = container.querySelector( `.${ prefixClassname }-item-loading-error` )
	const captionElement = container.querySelector( `.${ prefixClassname }-item-caption` )

	// Check if image has started loading and rendering
	function checkImageRender() {
		if ( imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0 ) {
			captionElement.style.visibility = 'visible'
		} else {
			requestAnimationFrame( checkImageRender )
		}
	}
	checkImageRender()

	if ( refresh ) {
		const slider = parentContainer.querySelector( `.${ prefixClassname }` )
		const items = slider.querySelectorAll( `.${ prefixClassname }-item` )

		items.forEach( ( item ) => {
			const image = item.querySelector( 'img' )
			const caption = item.querySelector( `.${ prefixClassname }-item-caption` )
			const attribution = item.querySelector( `.${ prefixClassname }-item-attribution` )

			if ( image ) {
				item.removeChild( image )
			}
			if ( caption ) {
				item.removeChild( caption )
			}
			if ( attribution ) {
				item.removeChild( attribution )
			}
		} )

		// eslint-disable-next-line no-use-before-define
		renderNext( 0, true )
		loading.style.visibility = 'visible'
		errorElement.style.visibility = 'hidden'
	}

	if ( imageElement.complete ) {
		loading.style.visibility = 'hidden'
		errorElement.style.visibility = 'hidden'
		imageElement.style.visibility = 'visible'
	} else {
		const textElement = container.querySelector( `.${ prefixClassname }-item-loading-text` )
		const timeoutId = setTimeout( () => {
			textElement.style.visibility = 'visible'
		}, 5000 )

		imageElement.addEventListener( 'load', () => {
			loading.style.visibility = 'hidden'
			errorElement.style.visibility = 'hidden'
			textElement.style.visibility = 'hidden'
			clearTimeout( timeoutId )
		} )

		imageElement.addEventListener( 'error', () => {
			const refreshElement = container.querySelector( `.${ prefixClassname }-item-loading-error-refresh` )
			loading.style.visibility = 'hidden'
			imageElement.style.visibility = 'hidden'

			if ( !isOnline() ) {
				const errorElementText = container.querySelector( `.${ prefixClassname }-item-loading-error-text` )
				errorElementText.innerText = msg( lang, 'gallery-loading-error-offline' )
				errorElement.classList.add( 'offline' )
			}
			errorElement.style.visibility = 'visible'
			clearTimeout( timeoutId )

			refreshElement.addEventListener( 'click', () => {
				bindImageEvent( container, true )
			} )
		} )
	}

	captionElement.addEventListener( 'click', () => {
		handleCaptionExpansion( container )
	} )
}

const showImageAndInfo = ( index, refreshImage = false ) => {
	const slider = parentContainer.querySelector( `.${ prefixClassname }` )
	const items = slider.querySelectorAll( `.${ prefixClassname }-item` )
	const item = items[ index ]

	if ( item ) {
		requestPageMediaInfo(
			lang,
			gallery[ index ].title,
			( mediaInfo ) => {
				const imageElement = item.querySelector( 'img' )
				const atrributionElement = item.querySelector( `.${ prefixClassname }-item-attribution` )

				if ( !imageElement ) {
					const getDescription = () => {
						// description list order
						// (1) commons caption - Not found
						// (2) commons description
						// (3) media-list caption
						if ( mediaInfo.description ) {
							return mediaInfo.description
						} else if ( gallery[ index ].caption ) {
							return gallery[ index ].caption
						} else {
							return ''
						}
					}
					const description = getDescription()
					const isCaptionExpandable = () => {
						if ( getClientWidth() < 400 && description.length > 128 ) {
							return true
						} else if ( getClientWidth() > 400 && description.length > 142 ) {
							return true
						} else {
							return false
						}
					}

					const caption = `<div class="${ prefixClassname }-item-caption">
						${ isCaptionExpandable() ? `<div class="${ prefixClassname }-item-caption-expand-cue"></div>` : '' }
						<div class="${ prefixClassname }-item-caption-text"><bdi>${ description }</bdi></div>
					</div>`

					item.insertAdjacentHTML( 'beforeend', `<div class="${ prefixClassname }-item-img"><img src="${ mediaInfo.bestFitImageUrl } ${ refreshImage ? '?timestamp=' + Date.now() : '' }"/>${ caption }</div>` )
					bindImageEvent( item )
				}

				if ( !atrributionElement ) {
					item.insertAdjacentHTML(
						'beforeend',
						renderImageAttribution( mediaInfo )
					)
				}
			} )
	}
}

const renderNext = ( offset = 1, refresh = false ) => {
	const slider = parentContainer.querySelector( `.${ prefixClassname }` )
	const items = slider.querySelectorAll( `.${ prefixClassname }-item` )
	const nextButton = slider.querySelector( '.next' )
	const previousButton = slider.querySelector( '.previous' )
	const next = current + offset
	const item = items[ next ]
	const currentImage = items[ current ].querySelector( 'img' )

	if ( item ) {
		handleCaptionExpansion( items[ current ], true )
		current += offset
		nextButton.style.visibility = current === items.length - 1 ? 'hidden' : 'visible'
		previousButton.style.visibility = current === 0 ? 'hidden' : 'visible'
		clearZoom( currentImage )

		// render image attribution element - current, next, previous
		showImageAndInfo( current, refresh )
		showImageAndInfo( current + 1, refresh )
		showImageAndInfo( current - 1, refresh )
	}

	slider.style[ dir === 'ltr' ? 'marginLeft' : 'marginRight' ] = -getClientWidth() * current + 'px'

	// render counter
	const counterContainer = parentContainer.querySelector( '.wp-gallery-fullscreen-counter' )
	counterContainer.textContent = current + 1 + '/' + items.length
}

const renderPrevious = () => {
	renderNext( -1 )
}

const applyGestureEvent = () => {
	const container = parentContainer.querySelector( `.${ prefixClassname }` )
	const marginLR = dir === 'ltr' ? 'marginLeft' : 'marginRight'
	const items = container.querySelectorAll( `.${ prefixClassname }-item` )

	container.addEventListener( 'pointerdown', ( e ) => {
		if ( isInvalidEvent( e, prefixClassname ) ) {
			return
		}

		zoomStart( e )
		if ( getFingerAmount() === 1 && !isImgZoomedIn() ) {
			slideStart( e, container, marginLR )
		}
	} )
	container.addEventListener( 'pointermove', ( e ) => {
		if ( isInvalidEvent( e, prefixClassname ) ) {
			return
		}

		if ( getFingerAmount() > 1 ) {
			zoomMove( e )
		} else if ( isImgZoomedIn() ) {
			zoomScroll( e, renderNext, items, current, dir )
		} else {
			slideMove( e, container, marginLR, dir )
		}
	} )
	container.addEventListener( 'pointerout', ( e ) => {
		if ( isInvalidEvent( e, prefixClassname ) ) {
			return
		}

		container.style.transition = temp.originalTransition
		if ( getFingerAmount() === 1 && !isImgZoomedIn() ) {
			slideEnd( e, container, renderNext, marginLR, current )
		}
		zoomEnd( e )
	} )
}

const toggleFocusMode = () => {
	const galleryScreen = parentContainer.querySelector( '.wp-gallery-fullscreen' )
	galleryScreen.classList.toggle( 'wp-gallery-fullscreen-focus-mode' )
}

const onShowFn = () => {
	const sliderContainer = parentContainer.querySelector( `.${ prefixClassname }` )
	const items = sliderContainer.querySelectorAll( `.${ prefixClassname }-item` )
	const nextButton = sliderContainer.querySelector( '.next' )
	const previousButton = sliderContainer.querySelector( '.previous' )
	let tapped = false

	renderNext( 0 )
	applyGestureEvent()

	sliderContainer.addEventListener( 'click', ( e ) => {
		if ( e.target.className === `${ prefixClassname }-item` ||
				e.target.tagName === 'IMG' ) {
			if ( !tapped ) {
				tapped = setTimeout( () => {
					tapped = null
					toggleFocusMode()
				}, 300 )
			} else {
				// Double tap
				clearTimeout( tapped )
				tapped = null
				toggleZoom( e )
			}
		}
	} )

	// set the slider position when user resize the gallery fullscreen size
	const windowResize = function ( el ) {
		el.style.transition = 'unset'
		el.style.marginLeft = -current * getClientWidth() + 'px'
	}

	let windowResizeTimeout // used for debounced
	addEventListener( window, 'resize', () => {
		const slider = document.querySelector( '.' + prefixClassname )
		windowResize( slider )

		clearTimeout( windowResizeTimeout )
		windowResizeTimeout = setTimeout( () => {
			slider.style.removeProperty( 'transition' )
		}, 100 )
	} )

	if ( items.length === 1 ) {
		previousButton.style.visibility = 'hidden'
		nextButton.style.visibility = 'hidden'
	} else {
		nextButton.addEventListener( 'click', () => {
			renderNext()
		} )
		previousButton.addEventListener( 'click', () => {
			renderPrevious()
		} )
		addEventListener( window, 'keydown', ( { key } ) => {
			switch ( key ) {
				case 'ArrowRight':
				case 'Right':
					if ( dir === 'ltr' ) {
						renderNext()
					} else {
						renderPrevious()
					}
					break
				case 'ArrowLeft':
				case 'Left':
					if ( dir === 'ltr' ) {
						renderPrevious()
					} else {
						renderNext()
					}
					break
				default:
					break
			}
		} )
	}
}

export { renderImageSlider, onShowFn }
