import { renderImageSlider, onShowFn as sliderOnShowFn } from './slider'

const renderFullScreenGallery = ( lang, dir ) => {
		return `
			<div class="wp-gallery-fullscreen" lang="${lang}" dir="${dir}">
				<div class="wp-gallery-fullscreen-top">
					<div class="wp-gallery-fullscreen-top-close"></div>
				</div>
				<div class="wp-gallery-fullscreen-main"></div>
				<div class="wp-gallery-fullscreen-bottom">
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
