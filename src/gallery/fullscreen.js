import { renderImageSlider, onShowFn as sliderOnShowFn } from './slider'
import { addEventListener, clearAllEventListener } from './event'

const prefixClassname = 'wp-gallery-fullscreen'

const renderFullScreenGallery = ( lang, dir ) => {
	return `
		<div class="${prefixClassname}" lang="${lang}" dir="${dir}">
			<div class="${prefixClassname}-close"></div>
			<div class="${prefixClassname}-main"></div>
		</div>
	`.trim()
}

const hideFullscreenGallery = container => {
	const fullscreenGallery = container.querySelector( `.${prefixClassname}` )
	container.removeChild( fullscreenGallery )
	clearAllEventListener()
}

const showFullscreenGallery = (
	mediaItems,
	selectedThumb,
	lang,
	dir,
	container = document.body
) => {
	// render utils for fullscreen then slider component
	container.insertAdjacentHTML( 'beforeend', renderFullScreenGallery( lang, dir ) )
	container.querySelector( `.${prefixClassname}-main` )
		.insertAdjacentHTML( 'beforeend', renderImageSlider( mediaItems, selectedThumb, lang, dir, container ) )

	// onShow event for full screen component
	const closeButton = container.querySelector( `.${prefixClassname}-close` )
	closeButton.addEventListener( 'click', () => {
		hideFullscreenGallery( container )
	} )

	addEventListener( window, 'keydown', ( { key } ) => {
		if ( key === 'Escape' || key === 'Esc' ) {
			hideFullscreenGallery( container )
		}
	} )

	// onShow event for slider component
	sliderOnShowFn()
}

export { showFullscreenGallery }
