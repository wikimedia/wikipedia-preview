import { msg } from './i18n'
import '../style/preview.less'

const renderPreview = ( lang, data, isTouch ) => {
	const imageUrl = data.imgUrl
	return `
		<div class="wikipediapreviews ${isTouch ? 'mobile' : ''}">
			<div class="wikipediapreviews-header">
				<div class="wikipediapreviews-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreviews-header-wordmark"></div>
				<div class="wikipediapreviews-header-closebtn"></div>
			</div>
			<div class="wikipediapreviews-body">
				${data.extractHtml}
			</div>
			<div class="wikipediapreviews-footer">
				<span class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readmore">${msg( lang, 'continue-reading' )}</span>
				<a href="${data.pageUrl}" class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readonwiki" target="_blank">${msg( lang, 'read-more' )}</a>
				<div class="wikipediapreviews-footer-cc"></div>
				<div class="wikipediapreviews-footer-author"></div>
			</div>
		</div>
	`.trim()
}

export { renderPreview }
