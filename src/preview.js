import { msg } from './i18n'
import { buildWikipediaUrl, getLinkIconSvg } from './utils'
import { getGallery } from './gallery'
import '../style/preview.less'

const getPreviewHeader = ( lang, imageUrl = '', media = [] ) => {
	const showThumbnail = imageUrl !== '' && media.length > 0 && media.length < 3
	const thumbnail = imageUrl || media[ 0 ] && media[ 0 ].thumb
	return `
		<div class= "wikipediapreview-header ${ showThumbnail ? '' : 'wikipediapreview-header-no-thumb' }">
			${ showThumbnail ? `<div class="wikipediapreview-header-image" style="${ `background-image:url('${ thumbnail }');background-size:cover;` }"></div>` : '' }
			<div class="wikipediapreview-header-wordmark wikipediapreview-header-wordmark-${ lang }"></div>
			<div class="wikipediapreview-header-closebtn"></div>
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

const getReadOnWikiCta = ( lang, title, isMobile ) => {
	return `<a href="${ buildWikipediaUrl( lang, title, isMobile ) }" target="_blank" class="wikipediapreview-footer-link-cta">${ msg( lang, 'read-on-wiki' ) }</a>`
}

const render = (
	lang, isMobile, dir, headerContent, bodyContent, prefersColorScheme
) => {
	const colorScheme = prefersColorScheme === 'detect' ? '' : `wikipediapreview-${ prefersColorScheme }-theme`
	return `
		<div class="wikipediapreview ${ isMobile ? 'mobile' : '' } ${ colorScheme }" lang="${ lang }" dir="${ dir }">
			${ headerContent }
			${ bodyContent }
		</div>
	`.trim()
}

const renderPreview = ( lang, data, isMobile, prefersColorScheme ) => {
	const imageUrl = data.imgUrl,
		bodyContent = `
			${ getGallery( data.media ) }
			<div class="wikipediapreview-body">
				${ data.extractHtml }
				<div class="wikipediapreview-footer">
					<div class="wikipediapreview-footer-link">
						<a href="${ buildWikipediaUrl( lang, data.title, isMobile ) }"
							class="wikipediapreview-footer-link-cta" target="_blank"
							>
							${ msg( lang, 'read-more' ) }
							${ getLinkIconSvg( data.dir, '#36C' ) }
						</a>
					</div>
				</div>
				<div class="wikipediapreview-scroll-cue"></div>
			</div>
		`.trim()

	return render(
		lang,
		isMobile,
		data.dir,
		getPreviewHeader( lang, imageUrl, data.media ),
		bodyContent,
		prefersColorScheme
	)
}

const renderLoading = ( isMobile, lang, dir, prefersColorScheme ) => {
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

	return render( lang, isMobile, dir, getPreviewHeader( lang ), bodyContent, prefersColorScheme )
}

const renderError = ( isMobile, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-error-message' ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isMobile )

	return render( lang, isMobile, dir, getPreviewHeader( lang ), getPreviewBody( 'error', message, cta ), prefersColorScheme )
}

const renderDisambiguation = ( isMobile, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-disambiguation-message', title ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isMobile )

	return render( lang, isMobile, dir, getPreviewHeader( lang ), getPreviewBody( 'disambiguation', message, cta ), prefersColorScheme )
}

const renderOffline = ( isMobile, lang, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-offline-message' ) }</span>`
	const cta = `<a>${ msg( lang, 'preview-offline-cta' ) }</a>`

	return render( lang, isMobile, dir, getPreviewHeader( lang ), getPreviewBody( 'offline', message, cta ), prefersColorScheme )
}

export { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
