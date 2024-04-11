import { msg } from '../i18n'
import { getClientWidth, getSelectedImageIndex, getSelectedImageTitle } from '../utils'

const prefixClassname = 'wp-gallery-fullscreen'
const sliderPrefix = prefixClassname + '-slider'

const renderImageInfo = ( lang, mediaInfo, image ) => {
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
		licenseTypes.forEach( ( type ) => {
			if ( license && license.indexOf( type ) !== -1 ) {
				licenses += `<div class="${ prefixClassname }-item-attribution-info-${ type.toLowerCase() }"></div>`
			}
		} )
		return licenses
	}

	const author = mediaInfo.author ? mediaInfo.author : msg( lang, 'gallery-unknown-author' )
	const link = mediaInfo.filePage
	const description = getImageDescription()

	const isCaptionExpandable = () => {
		if ( getClientWidth() < 400 && description.length > 128 ) {
			return true
		} else if ( getClientWidth() > 400 && description.length > 142 ) {
			return true
		} else {
			return false
		}
	}

	// @todo consider a wrapper container for all the image info?
	return `
		<div class="${ sliderPrefix }-item-caption">
			${ isCaptionExpandable() ? `<div class="${ sliderPrefix }-item-caption-expand-cue"></div>` : '' }
			${ description ? `<div class="${ sliderPrefix }-item-caption-text"><bdi>${ description }</bdi></div>` : '' }
		</div>
		<div class="${ sliderPrefix }-item-attribution">
			<div class="${ sliderPrefix }-item-attribution-info">
				${ getLicenseInfo( mediaInfo.license ) }
				${ author ? `<bdi class="${ sliderPrefix }-item-attribution-info-author">${ author }</bdi>` : '' }
			</div>
			${ link ? `<div class="${ sliderPrefix }-item-attribution-more-info">
				<a href="${ link }" class="${ sliderPrefix }-item-attribution-more-info-link" target="_blank"></a>
			</div>` : '' }
		</div>
	`.trim()
}

const galleryviewer = ( { media, mediaInfo, selectedGalleryItem, lang, dir } ) => {
	if ( !media || !selectedGalleryItem ) {
		return ''
	}
	const current = getSelectedImageIndex( media, selectedGalleryItem )
	const title = getSelectedImageTitle( media, selectedGalleryItem )
	const info = mediaInfo[ title ]
	const loadingContent = info ? '' : `
		<div class="${ sliderPrefix }-item-loading">
			<div class="${ sliderPrefix }-item-loading-spinner">
				<div class="${ sliderPrefix }-item-loading-spinner-animation">
					<div class="${ sliderPrefix }-item-loading-spinner-animation-bounce"></div>
				</div>
			</div>
			<div class="${ sliderPrefix }-item-loading-text">${ msg( lang, 'gallery-loading-still' ) }</div>
		</div>
	`
	const errorContent = info === 'error' ? `
		<div class="${ sliderPrefix }-item-loading-error">
			<div class="${ sliderPrefix }-item-loading-error-text">${ msg( lang, 'gallery-loading-error' ) }</div>
			<div class="${ sliderPrefix }-item-loading-error-refresh">${ msg( lang, 'gallery-loading-error-refresh' ) }</div>
		</div>
	` : ''
	const loadedContent = info ? `
		<img src="${ info.bestFitImageUrl }" />
		${ renderImageInfo( lang, info, media[ current ] ) }
	` : ''
	const imageListHtml = media.map( ( image ) => `
		<div class="${ sliderPrefix }-item" key="${ image.thumb }">
			${ loadingContent }
			${ errorContent }
			${ loadedContent }
		</div>
		`
	).join( '' )
	return `
		<div class="${ prefixClassname }" lang="${ lang }" dir="${ dir }">
			<div class="${ prefixClassname }-close" onclick="closeGallery"></div>
			<div class="${ prefixClassname }-main" style="${ dir === 'ltr' ? 'margin-left' : 'margin-right' }:-${ current * getClientWidth() }px">
				<div class="${ prefixClassname }-main-slider">
					<div class="${ sliderPrefix }-button previous" onclick="previousGalleryImage"></div>
					<div class="${ sliderPrefix }-button next" onclick="nextGalleryImage"></div>
					${ imageListHtml }
				</div>
			</div>
		</div>
	`
}

export { galleryviewer }
