import { msg } from '../i18n'
import { getClientWidth, getSelectedImageIndex } from '../utils'

const prefixClassname = 'wp-gallery-fullscreen'

const galleryviewer = ( { media, selectedGalleryItem, lang, dir } ) => {
	if ( !media || !selectedGalleryItem ) {
		return ''
	}
	const current = getSelectedImageIndex( media, selectedGalleryItem )
	const imageListHtml = media.map( ( image ) => `
		<div class="${ prefixClassname }-item" key="${ image.thumb }">
			<div class="${ prefixClassname }-item-loading">
				<div class="${ prefixClassname }-item-loading-spinner">
					<div class="${ prefixClassname }-item-loading-spinner-animation">
						<div class="${ prefixClassname }-item-loading-spinner-animation-bounce"></div>
					</div>
				</div>
				<div class="${ prefixClassname }-item-loading-text">${ msg( lang, 'gallery-loading-still' ) }</div>
			</div>
			<div class="${ prefixClassname }-item-loading-error">
				<div class="${ prefixClassname }-item-loading-error-text">${ msg( lang, 'gallery-loading-error' ) }</div>
				<div class="${ prefixClassname }-item-loading-error-refresh">${ msg( lang, 'gallery-loading-error-refresh' ) }</div>
			</div>
		</div>
		`
	).join( '' )
	return `
		<div class="${ prefixClassname }" lang="${ lang }" dir="${ dir }">
			<div class="${ prefixClassname }-close" onclick="closeGallery"></div>
			<div class="${ prefixClassname }-button previous" onclick="previousGalleryImage"></div>
			<div class="${ prefixClassname }-button next" onclick="nextGalleryImage"></div>
			<div class="${ prefixClassname }-main" style="${ dir === 'ltr' ? 'margin-left' : 'margin-right' }:-${ current * getClientWidth() }px">
				${ imageListHtml }
			</div>
		</div>
	`
}

export { galleryviewer }
