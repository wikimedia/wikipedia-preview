import { msg } from './i18n'
import { buildWikipediaUrl } from './utils'
import '../style/preview.less'

const getPreviewHeader = ( lang, isTouch, imageUrl = '' ) => {
	return `
		<div class="wikipediapreview-header">
			${ imageUrl ? `<div class="wikipediapreview-header-image" style="${ `background-image:url('${ imageUrl }');background-size:cover;` }"></div>` : '' }
			<div class="wikipediapreview-header-wordmark${ imageUrl ? ' wikipediapreview-header-wordmark-with-image' : '' } wikipediapreview-header-wordmark-${ lang }"></div>
			${ isTouch ? '<div class="wikipediapreview-header-closebtn"></div>' : '' }
		</div>
`.trim()
}

const getPreviewBody = ( type, message, cta ) => {
	return `
		<div class="wikipediapreview-body wikipediapreview-body-${ type }">
			<div class="wikipediapreview-body-message">
				<div class="wikipediapreview-body-icon"></div>
					${ message }
			</div>
			<div class="wikipediapreview-body-action">
				${ cta }
			</div>
		</div>
`.trim()
}

const getReadOnWikiCta = ( lang, title, isTouch ) => {
	return `<a href="${ buildWikipediaUrl( lang, title, isTouch ) }" target="_blank" class="wikipediapreview-footer-link-cta">${ msg( lang, 'read-on-wiki' ) }</a>`
}

const render = ( lang, isTouch, dir, headerContent, bodyContent, prefersColorScheme ) => {
	const colorScheme = prefersColorScheme === 'detect' ? '' : `wikipediapreview-${ prefersColorScheme }-theme`
	return `
		<div class="wikipediapreview ${ isTouch ? 'mobile' : '' } ${ colorScheme }" lang="${ lang }" dir="${ dir }">
			${ headerContent }
			${ bodyContent }
		</div>
	`.trim()
}

const renderPreview = ( lang, data, isTouch, prefersColorScheme ) => {
	const imageUrl = data.imgUrl,
		bodyContent = `
			<div class="wikipediapreview-body">
				${ data.extractHtml }
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${ buildWikipediaUrl( lang, data.title, isTouch ) }" class="wikipediapreview-footer-link-cta" target="_blank">${ msg( lang, 'read-more' ) }</a>
					</div>
					<div class="wikipediapreview-footer-icon"></div>
				</div>
				<div class="wikipediapreview-gallery">
				</div>
			</div>
		`.trim()

	return render(
		lang,
		isTouch,
		data.dir,
		getPreviewHeader( lang, isTouch, imageUrl ),
		bodyContent,
		prefersColorScheme
	)
}

const renderLoading = ( isTouch, lang, dir, prefersColorScheme ) => {
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

	return render( lang, isTouch, dir, getPreviewHeader( lang, isTouch ), bodyContent, prefersColorScheme )
}

const renderError = ( isTouch, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-error-message' ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, getPreviewHeader( lang, isTouch ), getPreviewBody( 'error', message, cta ), prefersColorScheme )
}

const renderDisambiguation = ( isTouch, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-disambiguation-message', title ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, getPreviewHeader( lang, isTouch ), getPreviewBody( 'disambiguation', message, cta ), prefersColorScheme )
}

const renderOffline = ( isTouch, lang, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-offline-message' ) }</span>`
	const cta = `<a>${ msg( lang, 'preview-offline-cta' ) }</a>`

	return render( lang, isTouch, dir, getPreviewHeader( lang, isTouch ), getPreviewBody( 'offline', message, cta ), prefersColorScheme )
}

export { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
