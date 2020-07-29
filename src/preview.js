import { msg } from './i18n'
import '../style/preview.less'

const renderPreview = ( lang, data, isTouch ) => {
	const imageUrl = data.imgUrl
	return `
		<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
			<div class="wikipediapreview-header">
				<div class="wikipediapreview-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreview-header-wordmark">${msg( lang, 'wikipedia-wordmark' )}</div>
				<div class="wikipediapreview-header-closebtn"></div>
			</div>
			<div class="wikipediapreview-body">
				${data.extractHtml}
				<div class="wikipediapreview-gallery">
				</div>
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${msg( lang, 'continue-reading' )}</span>
				<a href="${data.pageUrl}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${msg( lang, 'read-more' )}</a>
				<div class="wikipediapreview-footer-cc"></div>
				<div class="wikipediapreview-footer-author"></div>
			</div>
		</div>
	`.trim()
}

export { renderPreview }
