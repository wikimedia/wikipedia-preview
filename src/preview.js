import { msg } from './i18n'
import { buildWikipediaUrl } from './utils'
import '../style/preview.less'

const getPreviewHeader = ( lang, imageUrl = '' ) => {
	return `
		<div class="wikipediapreview-header">
			${imageUrl ? `<div class="wikipediapreview-header-image" style="${`background-image:url('${imageUrl}');background-size:cover;`}"></div>` : ''}
			<div class="wikipediapreview-header-wordmark${imageUrl ? ' wikipediapreview-header-wordmark-with-image' : ''} wikipediapreview-header-wordmark-${lang}"></div>
			<div class="wikipediapreview-header-closebtn"></div>
		</div>
`.trim()
}

const getPreviewBody = ( type, message, cta ) => {
	return `
		<div class="wikipediapreview-body wikipediapreview-body-${type}">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${message}
			</div>
			<div class="wikipediapreview-body-action">
				${cta}
			</div>
		</div>
`.trim()
}

const render = ( lang, isTouch, dir, headerContent, bodyContent ) => {
	return `
		<div class="wikipediapreview ${isTouch ? 'mobile' : ''}" lang="${lang}" dir="${dir}">
			${headerContent}
			${bodyContent}
		</div>
	`.trim()
}

const renderPreview = ( lang, data, isTouch ) => {
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
}

const renderLoading = ( isTouch, lang, dir ) => {
	const bodyContent = `
		<div class="wikipediapreview-body wikipediapreview-body-loading">
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line smaller"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line larger"></div>
			<div class="wikipediapreview-body-loading-line medium"></div>
			<div class="wikipediapreview-body-loading-line smaller"></div>
		</div>
		<div class="wikipediapreview-footer-loading"></div>
	`.trim()

	return render( lang, isTouch, dir, getPreviewHeader( lang ), bodyContent )
}

const getReadOnWikiCta = ( lang, title, isTouch ) => {
	return `<a href="${buildWikipediaUrl( lang, title, isTouch )}" target="_blank" class="wikipediapreview-cta-readonwiki">${msg( lang, 'read-on-wiki' )}</a>`
}

const renderError = ( isTouch, lang, title, dir ) => {
	const message = `<span>${msg( lang, 'preview-error-message' )}</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'error', message, cta ) )
}

const renderDisambiguation = ( isTouch, lang, title, dir ) => {
	const message = `<span>${msg( lang, 'preview-disambiguation-message', title )}</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'disambiguation', message, cta ) )
}

const renderOffline = ( isTouch, lang, dir ) => {
	const message = `<span>${msg( lang, 'preview-offline-message' )}</span>`
	const cta = `<a>${msg( lang, 'preview-offline-cta' )}</a>`

	return render( lang, isTouch, dir, getPreviewHeader( lang ), getPreviewBody( 'offline', message, cta ) )
}

export { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
