import { msg } from '../i18n'
import {
	getClientWidth, getSelectedImageIndex,
	classesToString, getDir
} from '../utils'

const prefixClassname = 'wp-gallery-fullscreen'
const sliderPrefix = prefixClassname + '-slider'

const getImageDescription = ( image, info ) => {
	// description list order
	// (1) commons caption - Not found
	// (2) commons description
	// (3) media-list caption
	if ( info && info.description ) {
		return info.description
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
			licenses += `<div class="${ sliderPrefix }-item-attribution-info-${ type.toLowerCase() }"></div>`
		}
	} )
	return licenses
}

const isCaptionExpandable = ( description ) => {
	if ( !description ) {
		return false
	}
	if ( getClientWidth() < 400 && description.length > 128 ) {
		return true
	} else if ( getClientWidth() > 400 && description.length > 142 ) {
		return true
	} else {
		return false
	}
}

const galleryviewer = ( {
	media, mediaInfo, selectedGalleryItem, lang,
	galleryCaptionExpanded, galleryFocusMode
} ) => {
	if ( !media || !selectedGalleryItem ) {
		return ''
	}
	const dir = getDir( lang )
	const current = getSelectedImageIndex( media, selectedGalleryItem )

	const imageListHtml = media.map( ( image ) => {
		const info = mediaInfo[ image.title ]
		console.log( 'image', image.title, info ) // eslint-disable-line
		const loadingStyle = !( info && info.loaded ) ? '' : 'visibility: hidden;'
		const errorStyle = info && info.error ? '' : 'visibility: hidden;'
		const imgStyle = info && info.loaded ? '' : 'visibility: hidden;'
		const captionStyle = info ? '' : 'visibility: hidden;'
		const captionClasses = {
			[ sliderPrefix + '-item-caption' ]: true,
			expanded: galleryCaptionExpanded
		}
		const author = info && info.author ? info.author : msg( lang, 'gallery-unknown-author' )
		const link = info && info.filePage
		const description = getImageDescription( image, info )
		return `
			<div class="${ sliderPrefix }-item" key="${ image.title }">
				<!-- Loading -->
				<div class="${ sliderPrefix }-item-loading" style="${ loadingStyle }">
					<div class="${ sliderPrefix }-item-loading-spinner">
						<div class="${ sliderPrefix }-item-loading-spinner-animation">
							<div class="${ sliderPrefix }-item-loading-spinner-animation-bounce"></div>
						</div>
					</div>
					<div class="${ sliderPrefix }-item-loading-text">${ msg( lang, 'gallery-loading-still' ) }</div>
				</div>

				<!-- Error -->
				<div class="${ sliderPrefix }-item-loading-error" style="${ errorStyle }">
					<div class="${ sliderPrefix }-item-loading-error-text">${ msg( lang, 'gallery-loading-error' ) }</div>
					<div class="${ sliderPrefix }-item-loading-error-refresh">${ msg( lang, 'gallery-loading-error-refresh' ) }</div>
				</div>

				<!-- Image -->
				<img
					${ info ? 'src="' + info.bestFitImageUrl + '"' : '' }
					data-title="${ image.title }"
					style="${ imgStyle }"
				/>

				<!-- Caption -->
				<div
					class="${ classesToString( captionClasses ) }"
					style="${ captionStyle }"
					onclick="toggleGalleryCaption"
				>
					${ isCaptionExpandable( description ) ? `<div class="${ sliderPrefix }-item-caption-expand-cue"></div>` : '' }
					${ description ? `<div class="${ sliderPrefix }-item-caption-text"><bdi>${ description }</bdi></div>` : '' }
				</div>

				<!-- Attribution -->
				<div class="${ sliderPrefix }-item-attribution">
					<div class="${ sliderPrefix }-item-attribution-info">
						${ getLicenseInfo( info && info.license ) }
						${ author ? `<bdi class="${ sliderPrefix }-item-attribution-info-author">${ author }</bdi>` : '' }
					</div>
					${ link ? `<div class="${ sliderPrefix }-item-attribution-more-info">
						<a href="${ link }" class="${ sliderPrefix }-item-attribution-more-info-link" target="_blank"></a>
					</div>` : '' }
				</div>
			</div>
		`
	} ).join( '' )

	const galleryClasses = {
		[ prefixClassname ]: true,
		[ prefixClassname + '-focus-mode' ]: galleryFocusMode
	}
	return `
		<div class="${ classesToString( galleryClasses ) }" lang="${ lang }" dir="${ dir }" onclick="toggleGalleryFocusMode">
			<div class="${ prefixClassname }-main">
				<div class="${ prefixClassname }-slider" style="${ dir === 'ltr' ? 'margin-left' : 'margin-right' }:-${ current * getClientWidth() }px">
					${ imageListHtml }
					<div
						class="${ sliderPrefix }-button previous"
						style="${ current === 0 ? 'opacity:0.5;' : 'opacity:1;' }"
						onclick="previousGalleryImage"
					></div>
					<div
						class="${ sliderPrefix }-button next"
						style="${ current === media.length - 1 ? 'opacity:0.5;' : 'opacity:1;' }"
						onclick="nextGalleryImage"
					></div>
					<div class="${ prefixClassname }-close" onclick="closeGallery"></div>
				</div>
			</div>
		</div>
	`
}

export { galleryviewer }
