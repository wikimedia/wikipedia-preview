import { msg } from './i18n'
import '../style/preview.less'

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
					<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${msg( lang, 'continue-reading' )}</span>
					<a href="${data.pageUrl}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${msg( lang, 'read-more' )}</a>
					<div class="wikipediapreview-footer-cc"></div>
					<div class="wikipediapreview-footer-author"></div>
				</div>
			</div>
	`.trim()
	},

	renderLoading = ( isTouch ) => {
		return `
			<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
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
	},

	renderError = ( isTouch, lang, title ) => {
		return `
			<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
					<div class="wikipediapreview-header">
						<div class="wikipediapreview-loading-header-image"></div>
						<div class="wikipediapreview-header-wordmark"></div>
						<div class="wikipediapreview-header-closebtn"></div>
					</div>
					<div class="wikipediapreview-error">
						<div class="wikipediapreview-error-body">
							<div class="wikipediapreview-error-body-message">
								<div class="wikipediapreview-error-body-icon"></div>
								${msg( lang, 'preview-loading-error' )}
							</div>
							<div class="wikipediapreview-error-body-readon">
								<a href=${`https://${lang}.m.wikipedia.org/wiki/${encodeURIComponent( title )}`} target="_blank">${msg( lang, 'preview-loading-error-read' )}</a>
							</div>
						</div>
					</div>
			</div>
	`.trim()
	}

export { renderPreview, renderLoading, renderError }
