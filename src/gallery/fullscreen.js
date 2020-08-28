/* eslint-disable */
import { msg } from '../i18n'
import { renderImageSlider, onShowFn as sliderOnShowFn  } from './slider'

let gallery = [],
	current = 0

const renderFullScreenGallery = ( lang, dir ) => {
		return `
			<div class="wp-gallery-fullscreen" lang="${lang}" dir="${dir}">
				<div class="wp-gallery-fullscreen-top">
					<div class="wp-gallery-fullscreen-top-close"></div>
				</div>
				<div class="wp-gallery-fullscreen-main">
					<!-- Slider Component -->
					<!--
					<div class="wp-gallery-fullscreen-button previous"></div>
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
					-->
				</div>
				<div class="wp-gallery-fullscreen-bottom">
					<div class="wp-gallery-fullscreen-caption"></div>
				</div>
			</div>
		`.trim()
	},

	/*
	toggleLoading = ( loading, image, lang ) => {
		const text = loading.querySelector( '.wp-gallery-fullscreen-loading-text' ),
			error = loading.querySelector( '.wp-gallery-fullscreen-loading-error' ),
			refresh = loading.querySelector( '.wp-gallery-fullscreen-loading-error-refresh' ),
			spinner = loading.querySelector( '.wp-gallery-fullscreen-loading-spinner' ),

			timeoutId = setTimeout( () => {
				text.innerText = msg( lang, 'gallery-loading-still' )
				text.style.visibility = 'visible'
			}, 5000 ),

			onLoad = () => {
				clearTimeout( timeoutId )
				spinner.style.visibility = 'hidden'
				text.style.visibility = 'hidden'
				image.style.visibility = 'visible'
				image.removeEventListener( 'load', onLoad )
			},

			onRefresh = () => {
				toggleLoading( loading, image, lang )
				image.src = gallery[ current ].src
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
				image.removeEventListener( 'error', onError )
			}

		spinner.style.visibility = 'visible'
		image.style.visibility = 'hidden'
		text.style.visibility = 'hidden'
		error.style.visibility = 'hidden'
		refresh.style.visibility = 'hidden'

		image.addEventListener( 'load', onLoad )
		image.addEventListener( 'error', onError )
	},
	*/

	hideFullscreenGallery = container => {
		const fullscreenGallery = container.querySelector( '.wp-gallery-fullscreen' )
		container.removeChild( fullscreenGallery )
		current = 0
	},

	showFullscreenGallery = ( mediaItems, selectedThumb, lang, dir, container = document.body ) => {

		container.insertAdjacentHTML( 'beforeend', renderFullScreenGallery( lang, dir ) )
		container.querySelector( '.wp-gallery-fullscreen-main' )
			.insertAdjacentHTML( 'beforeend', renderImageSlider( mediaItems, selectedThumb, lang, dir ) )

		// onShow event for full screen component
		const closeButton = container.querySelector( '.wp-gallery-fullscreen-top-close' )
		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( container )
		} )

		// onShow event for slider component
		sliderOnShowFn()
	}

export { showFullscreenGallery }
