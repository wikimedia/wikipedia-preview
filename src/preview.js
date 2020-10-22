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

	getPreviewBody = ( type, message, cta ) => {
		return `
			<div class="wikipediapreview-body">
				<div class="wikipediapreview-body-template ${type}">
					<div class="wikipediapreview-body-template-message">
						<div class="wikipediapreview-body-template-icon"></div>
							${message}
					</div>
					<div class="wikipediapreview-body-template-action">
						${cta}
					</div>
				</div>
			</div>
	`.trim()
	},

	render = ( lang, isTouch, dir, headerContent, bodyContent ) => {
		return `
			<div class="wikipediapreview ${isTouch ? 'mobile' : ''}" lang="${lang}" dir="${dir}">
				${headerContent}
				${bodyContent}
			</div>
		`.trim()
	},

	renderPreview = ( lang, data, isTouch ) => {
		const imageUrl = data.imgUrl,
			bodyContent = `
				<div class="wikipediapreview-body">
					${data.extractHtml}
					<div class="wikipediapreview-gallery">
					</div>
				</div>
				<div class="wikipediapreview-footer">
					<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">${msg( lang, 'continue-reading' )}</span>
					<a href="${buildWikipediaUrl( lang, data.title, isTouch )}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${msg( lang, 'read-more' )}</a>
				</div>
			`.trim()

		return render( lang, isTouch, data.dir, getPreviewHeader( lang, imageUrl ), bodyContent )
	},

	renderLoading = ( isTouch, lang, dir ) => {
		const bodyContent = `
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
    `.trim()

		return render( lang, isTouch, dir, getPreviewHeader( lang ), bodyContent )
	},

	renderError = ( isTouch, lang, title, dir ) => {
		const message = `<span>${msg( lang, 'preview-error-message' )}</span>`,
			cta = `<a href="${buildWikipediaUrl( lang, title, isTouch )}" target="_blank">${msg( lang, 'read-on-wiki' )}</a>`

		return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'error', message, cta ) )
	},

	renderDisambiguation = ( isTouch, lang, title, dir ) => {
		const message = `<span>${msg( lang, 'preview-disambiguation-message', title )}</span>`,
			cta = `<a href="${buildWikipediaUrl( lang, title, isTouch )}" target="_blank">${msg( lang, 'read-on-wiki' )}</a>`

		return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'disambiguation', message, cta ) )
	},

	renderOffline = ( isTouch, lang, dir ) => {
		const message = `<span>${msg( lang, 'preview-offline-message' )}</span>`,
			cta = `<a>${msg( lang, 'preview-offline-cta' )}</a>`

		return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'offline', message, cta ) )
	}

export { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
