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

	/* eslint-disable */
	/* @todo moving this into slider.js
	renderImageInfo = ( mediaInfo, container, image, lang ) => {
		container.innerText = ''
		const getImageDescription = () => {
				if ( image.caption ) {
					return image.caption
				} else if ( mediaInfo.description ) {
					return mediaInfo.description
				} else {
					return ''
				}
			},

			getLicenseInfo = ( license ) => {
				const licenseTypes = [ 'CC', 'BY', 'SA', 'Fair', 'Public' ]
				let licenses = ''
				licenseTypes.forEach( type => {
					if ( license && license.indexOf( type ) !== -1 ) {
						licenses += `<div class="wp-gallery-fullscreen-attribution-info-${type.toLowerCase()}"></div>`
					}
				} )
				return licenses
			},

			author = mediaInfo.author ? mediaInfo.author : msg( lang, 'gallery-unknown-author' ),
			link = mediaInfo.filePage

		return `
			<div class="wp-gallery-fullscreen-caption">${getImageDescription()}</div>
			<div class="wp-gallery-fullscreen-attribution">
				<div class="wp-gallery-fullscreen-attribution-info">
					${getLicenseInfo( mediaInfo.license )}
					${ author ? `<div class="wp-gallery-fullscreen-attribution-info-author">${author}</div>` : ''}
				</div>
				<div class="wp-gallery-fullscreen-attribution-more-info">
					<a href="${link}" class="wp-gallery-fullscreen-attribution-more-info-link" target="_blank"></a>
				</div>
			</div>
		`.trim()
	},
	*/
	/* eslint-enable */

	hideFullscreenGallery = container => {
		const fullscreenGallery = container.querySelector( '.wp-gallery-fullscreen' )
		container.removeChild( fullscreenGallery )
	},

	/* @todo moving this part into slider.js
	renderNext = ( galleryContainer, lang, offset = 1 ) => {
		if ( gallery[ next ] ) {
			bottom.innerText = ''
			requestPageMediaInfo(
				lang,
				gallery[ next ].title,
				gallery[ next ].fromCommon,
				mediaInfo => {
					bottom.insertAdjacentHTML(
						'beforeend',
						renderImageInfo( mediaInfo, bottom, gallery[ next ], lang
					) )
				} )
		}
	},
	*/

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
