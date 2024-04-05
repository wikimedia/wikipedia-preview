import { msg } from './../i18n'
import { buildWikipediaUrl, getDir, classesToString } from './../utils'
import { galleryrow } from './galleryrow'
import '../../style/preview.less'

const header = ( { lang, imageUrl } ) => {
	return `
		<div class="wikipediapreview-header">
			${ imageUrl ? `<div class="wikipediapreview-header-image" style="${ `background-image:url('${ imageUrl }');background-size:cover;` }"></div>` : '' }
			<div class="wikipediapreview-header-wordmark${ imageUrl ? ' wikipediapreview-header-wordmark-with-image' : '' } wikipediapreview-header-wordmark-${ lang }"></div>
			<div class="wikipediapreview-header-closebtn" onclick="close"></div>
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
	return `<a href="${ buildWikipediaUrl( lang, title, isTouch ) }" target="_blank" class="wikipediapreview-cta-readonwiki">${ msg( lang, 'read-on-wiki' ) }</a>`
}

const render = ( lang, isTouch, dir, headerContent, bodyContent, prefersColorScheme ) => {
	const classes = {
		wikipediapreview: true,
		mobile: isTouch,
		'wikipediapreview-dark-theme': prefersColorScheme === 'dark',
		'wikipediapreview-light-theme': prefersColorScheme === 'light'
	}
	return `
		<div class="${ classesToString( classes ) }" lang="${ lang }" dir="${ dir }" onmouseleave="close">
			${ headerContent }
			${ bodyContent }
		</div>
	`.trim()
}

const renderPreview = ( lang, data, media, expanded, isTouch, prefersColorScheme ) => {
	const imageUrl = data.imgUrl,
		gallery = galleryrow( media, lang ),
		footerContent = expanded ?
			`<a href="${ buildWikipediaUrl( lang, data.title, isTouch ) }" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">${ msg( lang, 'read-more' ) }</a>` :
			`<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore" onclick="expand">${ msg( lang, 'continue-reading' ) }</span>`,
		bodyContent = `
			<div class="wikipediapreview-body">
				${ data.extractHtml }
				${ gallery }
			</div>
			<div class="wikipediapreview-footer">
				${ footerContent }
			</div>
		`.trim()

	return render(
		lang,
		isTouch,
		data.dir,
		header( lang, imageUrl ),
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

	return render( lang, isTouch, dir, header( lang ), bodyContent, prefersColorScheme )
}

const renderError = ( isTouch, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-error-message' ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, header( lang ), getPreviewBody( 'error', message, cta ), prefersColorScheme )
}

const renderDisambiguation = ( isTouch, lang, title, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-disambiguation-message', title ) }</span>`
	const cta = getReadOnWikiCta( lang, title, isTouch )

	return render( lang, isTouch, dir, header( lang ), getPreviewBody( 'disambiguation', message, cta ), prefersColorScheme )
}

const renderOffline = ( isTouch, lang, dir, prefersColorScheme ) => {
	const message = `<span>${ msg( lang, 'preview-offline-message' ) }</span>`
	const cta = `<a>${ msg( lang, 'preview-offline-cta' ) }</a>`

	return render( lang, isTouch, dir, header( lang ), getPreviewBody( 'offline', message, cta ), prefersColorScheme )
}

const loading = () => {
	return `
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
}

const body = ( state ) => {
	if ( !state.data ) {
		return loading()
	}
}

const footer = ( state ) => {

}

// todo: consider haaaving the 'mobile' class
// set at the popup level and not propagated here
const preview = ( state ) => {
	if ( state.data ) {
		return renderPreview( lang, data, media, expanded, isTouch, prefersColorScheme )
	} else {
		return renderLoading( isTouch, lang, getDir( lang ), prefersColorScheme )
	}
	const classes = {
		wikipediapreview: true,
		mobile: isTouch,
		'wikipediapreview-dark-theme': prefersColorScheme === 'dark',
		'wikipediapreview-light-theme': prefersColorScheme === 'light'
	}
	return `
		<div class="${ classesToString( classes ) }" lang="${ lang }" dir="${ dir }" onmouseleave="close">
			${ header( state ) }
			${ body( state ) }
			${ footer( state ) }
		</div>
	`.trim()
}

export { preview, renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline }
