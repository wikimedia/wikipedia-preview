import { msg } from './i18n'
import { buildWikipediaUrl } from './utils'
import '../style/preview.less'

const getPreviewHeader = ( lang, imageUrl = '' ) =>{
		return `
			<div class="wikipediapreview-header">
				${imageUrl ? `<div class="wikipediapreview-header-image" style="${`background-image:url('${imageUrl}');background-size:cover;`}"></div>` : ''}
				<div class="wikipediapreview-header-wordmark${imageUrl ? ' wikipediapreview-header-wordmark-with-image' : ''} wikipediapreview-header-wordmark-${lang}"></div>
				<div class="wikipediapreview-header-closebtn"></div>
			</div>
	`.trim()
	},

	getPreviewBody = ( lang, title, type, isTouch = false ) => {
		const getMessage = () => {
				if ( type === 'disambiguation' ) {
					return `<span>${msg( lang, `preview-${type}-message`, title )}</span>`
				}
				return `<span>${msg( lang, `preview-${type}-message` )}</span>`
			},

			getCallToAction = () => {
				if ( type === 'offline' ) {
					return `<a>${msg( lang, 'preview-offline-cta' )}</a>`
				}
				return `<a href="${buildWikipediaUrl( lang, title, isTouch )}" target="_blank">${msg( lang, 'read-on-wiki' )}</a>`
			}

		return `
			<div class="wikipediapreview-body">
				<div class="wikipediapreview-body-template-${type}">
					<div class="wikipediapreview-body-template-message">
						<div class="wikipediapreview-body-template-icon"></div>
							${getMessage()}
					</div>
					<div class="wikipediapreview-body-template-action">
						${getCallToAction()}
					</div>
				</div>
			</div>
	`.trim()
	},

	renderPreview = ( lang, data, isTouch ) => {
		const imageUrl = data.imgUrl
		return `
			<div class="wikipediapreview${isTouch ? ' mobile' : ''}" lang="${lang}" dir="${data.dir}">
				${getPreviewHeader( lang, imageUrl )}
				<div class="wikipediapreview-body">
					${data.extractHtml}
					<div class="wikipediapreview-gallery">
					</div>
				</div>
				<div class="wikipediapreview-footer">
					<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${msg( lang, 'continue-reading' )}</span>
					<a href="${buildWikipediaUrl( lang, data.title, isTouch )}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${msg( lang, 'read-more' )}</a>
				</div>
			</div>
	`.trim()
	},

	renderLoading = ( isTouch, lang, dir ) => {
		return `
			<div class="wikipediapreview${isTouch ? ' mobile' : ''}" lang="${lang}" dir="${dir}">
					${getPreviewHeader( lang )}
					<div class="wikipediapreview-loading">
						<div class="wikipediapreview-body">
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

	renderError = ( isTouch, lang, title, dir ) => {
		return `
			<div class="wikipediapreview expanded ${isTouch ? 'mobile' : ''}" lang="${lang}" dir="${dir}">
					${getPreviewHeader( lang )}
					${getPreviewBody( lang, title, 'error', isTouch )}
			</div>
	`.trim()
	},

	renderDisambiguation = ( isTouch, lang, title, dir ) => {
		return `
			<div class="wikipediapreview expanded ${isTouch ? 'mobile' : ''}" lang="${lang}" dir="${dir}">
					${getPreviewHeader( lang )}
					${getPreviewBody( lang, title, 'disambiguation', isTouch )}
			</div>
	`.trim()
	},

	renderOffline = ( isTouch, lang, dir ) => {
		return `
			<div class="wikipediapreview expanded ${isTouch ? 'mobile' : ''}" lang="${lang}" dir="${dir}">
					${getPreviewHeader( lang )}
					${getPreviewBody( lang, false, 'offline', isTouch )}
			</div>
	`.trim()
	}

export { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
