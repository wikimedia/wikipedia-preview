import '../style/preview.less'
import { getGalleryRow } from './gallery'

const renderPreview = ( lang, data, isTouch ) => {
	const imageUrl = data.summary.imgUrl
	return `
		<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
			<div class="wikipediapreview-header">
				<div class="wikipediapreview-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreview-header-wordmark"></div>
				<div class="wikipediapreview-header-closebtn"></div>
			</div>
			<div class="wikipediapreview-body">
				${data.summary.extractHtml}
				<div class="wikipediapreview-gallery">
					${getGalleryRow( data.media )}
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">Continue Reading</span>
				<a href="${data.summary.pageUrl}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">Read more on Wikipedia</a>
				<div class="wikipediapreview-footer-cc"></div>
				<div class="wikipediapreview-footer-author"></div>
			</div>
		</div>
	`.trim()
}

export { renderPreview }
