import { renderImageSlider, onShowFn as sliderOnShowFn } from './slider'

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

	hideFullscreenGallery = container => {
		const fullscreenGallery = container.querySelector( '.wp-gallery-fullscreen' )
		container.removeChild( fullscreenGallery )
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
