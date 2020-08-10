import { msg } from './i18n'
import '../style/preview.less'

const renderPreview = ( lang, data, isTouch ) => {
		const imageUrl = data.imgUrl
		return `
			<div class="wikipediapreview${isTouch ? ' mobile' : ''}" lang="${lang}" dir="${data.dir}">
				<div class="wikipediapreview-header">
					<div class="wikipediapreview-header-image${imageUrl ? '' : '-wikipedia' }" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
					<div class="wikipediapreview-header-wordmark"></div>
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
	},

	renderLoading = ( isTouch, lang, dir ) => {
		return `
			<div class="wikipediapreview${isTouch ? ' mobile' : ''}" lang="${lang}" dir="${dir}">
					<div class="wikipediapreview-header">
						<div class="wikipediapreview-loading-header-image"></div>
						<div class="wikipediapreview-header-wordmark"></div>
						<div class="wikipediapreview-header-closebtn"></div>
					</div>
					<div class="wikipediapreview-loading">
						<div class="wikipediapreview-loading-body">
							<div class="wikipediapreview-loading-body-line larger"></div>
							<div class="wikipediapreview-loading-body-line medium"></div>
							<div class="wikipediapreview-loading-body-line larger"></div>
							<div class="wikipediapreview-loading-body-line medium"></div>
							<div class="wikipediapreview-loading-body-line smaller"></div>
							<div class="wikipediapreview-loading-body-line larger"></div>
							<div class="wikipediapreview-loading-body-line medium"></div>
							<div class="wikipediapreview-loading-body-line larger"></div>
							<div class="wikipediapreview-loading-body-line medium"></div>
							<div class="wikipediapreview-loading-body-line smaller"></div>
						</div>
					</div>
					<div class="wikipediapreview-loading-footer"></div>
			</div>
  `.trim()
	}

export { renderPreview, renderLoading }
