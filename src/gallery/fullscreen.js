// import { msg } from '../i18n'

let gallery = [],
	current = 0
const clientWidth = window.innerWidth,
	renderImageSlider = ( images, index ) => {
		return `<div class="wp-gallery-fullscreen-slider" style="margin-left:-${index * clientWidth}px">
			${images.map( image => {
		return `<div class="wp-gallery-fullscreen-slider-item"><img src="${image.src}"/></div>`
	} ).join( '' )}
		</div>`.trim()
	}, renderFullScreenGallery = ( images, index, lang, dir ) => {
		return `
			<div class="wp-gallery-fullscreen" lang="${lang}" dir="${dir}">
				<div class="wp-gallery-fullscreen-top">
					<div class="wp-gallery-fullscreen-button close"></div>
				</div>
				<div class="wp-gallery-fullscreen-main">
					<div class="wp-gallery-fullscreen-button previous"></div>
					${renderImageSlider( images, index )}
					<div class="wp-gallery-fullscreen-image">
						<img src="">
						<div class="wp-gallery-fullscreen-loading">
							<div class="wp-gallery-fullscreen-loading-icons">
								<div class="wp-gallery-fullscreen-loading-spinner">
									<div class="wp-gallery-fullscreen-loading-spinner-animation">
										<div class="wp-gallery-fullscreen-loading-spinner-animation-bounce"></div>
									</div>
								</div>
								<div class="wp-gallery-fullscreen-loading-error"></div>
							</div>
							<div class="wp-gallery-fullscreen-loading-text"></div>
							<div class="wp-gallery-fullscreen-loading-error-refresh"></div>
						</div>
					</div>
					<div class="wp-gallery-fullscreen-button next"></div>
				</div>
				<div class="wp-gallery-fullscreen-bottom">
					<div class="wp-gallery-fullscreen-caption"></div>
				</div>
			</div>
		`.trim()
	},

	toggleLoading = ( loading ) => {
		const text = loading.querySelector( '.wp-gallery-fullscreen-loading-text' ),
			error = loading.querySelector( '.wp-gallery-fullscreen-loading-error' ),
			refresh = loading.querySelector( '.wp-gallery-fullscreen-loading-error-refresh' ),
			spinner = loading.querySelector( '.wp-gallery-fullscreen-loading-spinner' )

		/*
			timeoutId = setTimeout( () => {
				text.innerText = msg( lang, 'gallery-loading-still' )
				text.style.visibility = 'visible'
			}, 5000 ),

			onLoad = () => {
				clearTimeout( timeoutId )
				spinner.style.visibility = 'hidden'
				text.style.visibility = 'hidden'
			},

			/*
			onRefresh = () => {
				toggleLoading( loading, lang )
				refresh.removeEventListener( 'click', onRefresh )
			},

			onError = () => {
				clearTimeout( timeoutId )
				error.style.visibility = 'visible'
				spinner.style.visibility = 'hidden'
				text.innerText = msg( lang, 'gallery-loading-error' )
				text.style[ 'font-size' ] = '16px'
				text.style.visibility = 'visible'
				refresh.innerText = msg( lang, 'gallery-loading-error-refresh' )
				refresh.style.visibility = 'visible'
				refresh.addEventListener( 'click', onRefresh )
			}
			*/

		spinner.style.visibility = 'visible'
		text.style.visibility = 'hidden'
		error.style.visibility = 'hidden'
		refresh.style.visibility = 'hidden'

		/*
		image.addEventListener( 'load', onLoad )
		image.addEventListener( 'error', onError )
		*/
	},

	hideFullscreenGallery = container => {
		const fullscreenGallery = container.querySelector( '.wp-gallery-fullscreen' )
		container.removeChild( fullscreenGallery )
		current = 0
	},

	renderNext = ( galleryContainer, lang, offset = 1 ) => {
		const slider = galleryContainer.querySelector( '.wp-gallery-fullscreen-slider' ),
			caption = galleryContainer.querySelector( '.wp-gallery-fullscreen-caption' ),
			nextButton = galleryContainer.querySelector( '.next' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			next = current + offset,
			loading = galleryContainer.querySelector( '.wp-gallery-fullscreen-loading' )

		if ( gallery[ next ] ) {
			toggleLoading( loading, lang )
			caption.innerText = gallery[ next ].caption ? gallery[ next ].caption : ''
			current += offset
			nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
			previousButton.style.opacity = current === 0 ? '0.5' : '1'

			console.log( `${current} index, clientWidth ${clientWidth}, marginLeft ${slider.style.marginLeft}` ) // eslint-disable-line
			slider.style.marginLeft = -clientWidth * current + 'px'
		}
	},

	renderPrevious = ( galleryContainer, lang ) => {
		renderNext( galleryContainer, lang, -1 )
	},

	showFullscreenGallery = ( mediaItems, selectedThumb, lang, dir, container = document.body ) => {

		let selectedThumbIndex = 0
		gallery = mediaItems
		gallery.some( ( image, index ) => {
			if ( image.thumb === selectedThumb ) {
				selectedThumbIndex = index
				return true
			}
			return false
		} )

		container.insertAdjacentHTML( 'beforeend', renderFullScreenGallery( mediaItems, selectedThumbIndex, lang, dir ) )

		const slider = container.querySelector( '.wp-gallery-fullscreen-slider' ),
			galleryContainer = container.querySelector( '.wp-gallery-fullscreen' ),
			nextButton = galleryContainer.querySelector( '.next' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			closeButton = galleryContainer.querySelector( '.close' )

		// @todo encapsulate this
		// bind swiping event
		let temp = { // eslint-disable-line
			screenX: null,
			targetScreenX: null,
			originalMarginLeft: null,
			currentMarginLeft: null,
			originalTransition: null
		}
		galleryContainer.addEventListener( 'touchstart', e => {
			temp.screenX = e.touches[ 0 ].clientX
			temp.targetScreenX = null
			temp.originalMarginLeft = +window.getComputedStyle( slider ).marginLeft.slice( 0, -2 )
			temp.currentMarginLeft = +window.getComputedStyle( slider ).marginLeft.slice( 0, -2 )
			temp.originalTransition = window.getComputedStyle( slider ).transition
			slider.style.transition = 'unset'
		} )
		galleryContainer.addEventListener( 'touchmove', e => {
			const clientX = e.touches[ 0 ].clientX,
				offset = clientX - temp.screenX
			temp.targetScreenX = clientX
			temp.currentMarginLeft = temp.originalMarginLeft + offset
			slider.style.marginLeft = temp.currentMarginLeft + 'px'
		} )
		galleryContainer.addEventListener( 'touchend', () => {
			slider.style.transition = temp.originalTransition
			const diff = temp.originalMarginLeft - temp.currentMarginLeft

			if ( Math.abs( diff / clientWidth ) > 0.4 ) {
				renderNext( galleryContainer, lang, diff > 0 ? 1 : -1 )
			} else {
				slider.style.marginLeft = temp.originalMarginLeft + 'px'
			}
		} )
		// end of the binding event

		renderNext( galleryContainer, lang, selectedThumbIndex )

		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( container )
		} )

		if ( gallery.length === 1 ) {
			previousButton.style.visibility = 'hidden'
			nextButton.style.visibility = 'hidden'
		} else {
			nextButton.addEventListener( 'click', () => {
				renderNext( galleryContainer, lang )
			} )

			previousButton.addEventListener( 'click', () => {
				renderPrevious( galleryContainer, lang )
			} )
		}
	}

export { showFullscreenGallery }
