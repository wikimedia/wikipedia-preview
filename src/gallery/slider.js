import { msg } from '../i18n'
import { requestPageMediaInfo } from '../api'
import { isOnline } from '../utils'
import { temp, isInvalidEvent, isImgZoomedIn, getFingerAmount, toggleZoom, clearZoom, zoomStart, zoomMove, zoomScroll, zoomEnd, slideStart, slideMove, slideEnd } from './gestures'
import { addEventListener } from './event'

// internal state of the slider component
let current = 0
let dir = ''
let lang
let gallery
let parentContainer

const clientWidth = window.innerWidth
const prefixClassname = 'wp-gallery-fullscreen-slider'

const renderImageSlider = ( images = [], selectedImage = '', givenLang, givenDir, container ) => {
	const imageListHtml = images.map( () => `
		<div class="${prefixClassname}-item">
				<div class="${prefixClassname}-item-loading">
						<div class="${prefixClassname}-item-loading-spinner">
								<div class="${prefixClassname}-item-loading-spinner-animation">
										<div class="${prefixClassname}-item-loading-spinner-animation-bounce"></div>
								</div>
						</div>
						<div class="${prefixClassname}-item-loading-text">${msg( givenLang, 'gallery-loading-still' )}</div>
				</div>
				<div class="${prefixClassname}-item-loading-error">
					<div class="${prefixClassname}-item-loading-error-text">${msg( givenLang, 'gallery-loading-error' )}</div>
					<div class="${prefixClassname}-item-loading-error-refresh">${msg( givenLang, 'gallery-loading-error-refresh' )}</div>
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
		<div class="${prefixClassname}" style="${dir === 'ltr' ? 'margin-left' : 'margin-right'}:-${current * clientWidth}px">
				<div class="${prefixClassname}-button previous"></div>
				<div class="${prefixClassname}-button next"></div>
				${imageListHtml}
		</div>
		`.trim()
}

const renderImageInfo = ( mediaInfo, image ) => {
	const getImageDescription = () => {
		// description list order
		// (1) commons caption - Not found
		// (2) commons description
		// (3) media-list caption
		if ( mediaInfo.description ) {
			return mediaInfo.description
		} else if ( image.caption ) {
			return image.caption
		} else {
			return ''
		}
	}

	const getLicenseInfo = ( license ) => {
		const licenseTypes = [ 'CC', 'BY', 'SA', 'Fair', 'Public' ]
		let licenses = ''
		licenseTypes.forEach( type => {
			if ( license && license.indexOf( type ) !== -1 ) {
				licenses += `<div class="${prefixClassname}-item-attribution-info-${type.toLowerCase()}"></div>`
			}
		} )
		return licenses
	}

	const author = mediaInfo.author ? mediaInfo.author : msg( lang, 'gallery-unknown-author' )
	const link = mediaInfo.filePage
	const description = getImageDescription()

	const isCaptionExpandable = () => {
		if ( clientWidth < 400 && description.length > 128 ) {
			return true
		} else if ( clientWidth > 400 && description.length > 142 ) {
			return true
		} else {
			return false
		}
	}

	// @todo consider a wrapper container for all the image info?
	return `
		<div class="${prefixClassname}-item-caption">
			${isCaptionExpandable() ? `<div class="${prefixClassname}-item-caption-expand-cue"></div>` : ''}
			${description ? `<div class="${prefixClassname}-item-caption-text"><bdi>${description}</bdi></div>` : ''}
		</div>
		<div class="${prefixClassname}-item-attribution">
			<div class="${prefixClassname}-item-attribution-info">
				${getLicenseInfo( mediaInfo.license )}
				${author ? `<bdi class="${prefixClassname}-item-attribution-info-author">${author}</bdi>` : ''}
			</div>
			${link ? `<div class="${prefixClassname}-item-attribution-more-info">
				<a href="${link}" class="${prefixClassname}-item-attribution-more-info-link" target="_blank"></a>
			</div>` : ''}
		</div>
	`.trim()
}

const bindImageEvent = ( container, refresh = false ) => {
	const imageElement = container.querySelector( 'img' )
	const loading = container.querySelector( `.${prefixClassname}-item-loading` )
	const errorElement = container.querySelector( `.${prefixClassname}-item-loading-error` )

	if ( refresh ) {
		const slider = parentContainer.querySelector( `.${prefixClassname}` )
		const items = slider.querySelectorAll( `.${prefixClassname}-item` )

		items.forEach( item => {
			const image = item.querySelector( 'img' )
			const caption = item.querySelector( `.${prefixClassname}-item-caption` )
			const attribution = item.querySelector( `.${prefixClassname}-item-attribution` )

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
		const textElement = container.querySelector( `.${prefixClassname}-item-loading-text` )
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
			const refreshElement = container.querySelector( `.${prefixClassname}-item-loading-error-refresh` )
			loading.style.visibility = 'hidden'
			imageElement.style.visibility = 'hidden'

			if ( !isOnline() ) {
				const errorElementText = container.querySelector( `.${prefixClassname}-item-loading-error-text` )
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
}

const handleCaptionExpansion = ( item, forceClose = false ) => {
	const captionText = item.querySelector( `.${prefixClassname}-item-caption-text` )
	const expandCue = item.querySelector( `.${prefixClassname}-item-caption-expand-cue` )
	const expanded = item.querySelector( '.expanded' )

	if ( expandCue && expanded || forceClose && expandCue ) {
		expandCue.classList.remove( 'expanded' )
		captionText.style.maxHeight = '80px'
	} else if ( expandCue ) {
		expandCue.classList.add( 'expanded' )
		captionText.style.maxHeight = '241px'
	}
}

const showImageAndInfo = ( index, refreshImage = false ) => {
	const slider = parentContainer.querySelector( `.${prefixClassname}` )
	const items = slider.querySelectorAll( `.${prefixClassname}-item` )
	const item = items[ index ]

	if ( item ) {
		requestPageMediaInfo(
			lang,
			gallery[ index ].title,
			mediaInfo => {
				const imageElement = item.querySelector( 'img' )
				const captionElement = item.querySelector( `.${prefixClassname}-item-caption` )

				if ( !imageElement ) {
					if ( !refreshImage ) {
						item.insertAdjacentHTML( 'beforeend', `<img src="${mediaInfo.bestFitImageUrl}"/>` )
					} else {
						item.insertAdjacentHTML( 'beforeend', `<img src="${mediaInfo.bestFitImageUrl}?timestamp=${Date.now()}"/>` )
					}
					bindImageEvent( item )
				}

				if ( !captionElement ) {
					item.insertAdjacentHTML(
						'beforeend',
						renderImageInfo( mediaInfo, gallery[ index ] )
					)

					const insertedCaption = item.querySelector( `.${prefixClassname}-item-caption` )

					insertedCaption.addEventListener( 'click', () => {
						handleCaptionExpansion( item )
					} )
				}
			} )
	}
}

const renderNext = ( offset = 1, refresh = false ) => {
	const slider = parentContainer.querySelector( `.${prefixClassname}` )
	const items = slider.querySelectorAll( `.${prefixClassname}-item` )
	const nextButton = slider.querySelector( '.next' )
	const previousButton = slider.querySelector( '.previous' )
	const next = current + offset
	const item = items[ next ]
	const currentImage = items[ current ].querySelector( 'img' )

	if ( item ) {
		handleCaptionExpansion( items[ current ], true )
		current += offset
		nextButton.style.opacity = current === items.length - 1 ? '0.5' : '1'
		previousButton.style.opacity = current === 0 ? '0.5' : '1'
		clearZoom( currentImage )

		// render image attribution element - current, next, previous
		showImageAndInfo( current, refresh )
		showImageAndInfo( current + 1, refresh )
		showImageAndInfo( current - 1, refresh )
	}

	slider.style[ dir === 'ltr' ? 'marginLeft' : 'marginRight' ] = -clientWidth * current + 'px'
}

const renderPrevious = () => {
	renderNext( -1 )
}

const applyGestureEvent = () => {
	const container = parentContainer.querySelector( `.${prefixClassname}` )
	const marginLR = dir === 'ltr' ? 'marginLeft' : 'marginRight'
	const items = container.querySelectorAll( `.${prefixClassname}-item` )

	container.addEventListener( 'pointerdown', e => {
		if ( isInvalidEvent( e, prefixClassname ) ) {
			return
		}

		zoomStart( e )
		if ( getFingerAmount() === 1 && !isImgZoomedIn() ) {
			slideStart( e, container, marginLR )
		}
	} )
	container.addEventListener( 'pointermove', e => {
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
	container.addEventListener( 'pointerout', e => {
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
	const sliderContainer = parentContainer.querySelector( `.${prefixClassname}` )
	const items = sliderContainer.querySelectorAll( `.${prefixClassname}-item` )
	const nextButton = sliderContainer.querySelector( '.next' )
	const previousButton = sliderContainer.querySelector( '.previous' )
	let tapped = false

	renderNext( 0 )
	applyGestureEvent()

	sliderContainer.addEventListener( 'click', ( e ) => {
		if ( e.target.className === `${prefixClassname}-item` ||
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
