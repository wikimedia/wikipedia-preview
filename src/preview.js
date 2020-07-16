import '../style/preview.less'
import { getGalleryRow } from './gallery'

const renderPreview = ( lang, data, isTouch ) => {
		const imageUrl = data.imgUrl
		return `
		<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
			<div class="wikipediapreview-header">
				<div class="wikipediapreview-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreview-header-wordmark"></div>
				<div class="wikipediapreview-header-closebtn"></div>
			</div>
			<div class="wikipediapreview-body">
				${data.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">Continue Reading</span>
				<a href="${data.pageUrl}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">Read more on Wikipedia</a>
				<div class="wikipediapreview-footer-cc"></div>
				<div class="wikipediapreview-footer-author"></div>
			</div>
		</div>
	`.trim()
	},

	renderPreviewMedia = ( document, mediaList ) => {
		const gallery = document.body.querySelector( '.wikipediapreview-gallery' ),
			imagesRow = getGalleryRow( mediaList )

		gallery.appendChild( imagesRow )
	}

export { renderPreview, renderPreviewMedia }
