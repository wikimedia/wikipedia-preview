import { cachedRequest } from './cachedRequest'
import {
	buildMwApiUrl, convertUrlToMobile, logError,
	strip, getDeviceSize, sanitizeHTML, getAnalyticsQueryParam,
	getDir
} from './utils'
import { msg } from './i18n'

const titleWithoutSection = ( title ) => {
	return title.split( '#' )[ 0 ]
}

const requestMwExtract = ( lang, title, callback, request = cachedRequest ) => {
	const params = {
		action: 'query',
		prop: 'extracts|pageimages',
		exsentences: 4,
		explaintext: 1,
		exsectionformat: 'plain',
		piprop: 'thumbnail',
		pilimit: 1,
		titles: title
	}
	const url = buildMwApiUrl( lang, params ) + '&' + getAnalyticsQueryParam()
	request( url, ( result ) => {
		const page = result.query.pages[ Object.keys( result.query.pages )[ 0 ] ]
		if ( !page.extract ) {
			return false
		}
		return {
			title,
			extractHtml: '<p>' + page.extract + '</p>',
			imgUrl: page.thumbnail ? page.thumbnail.source : null,
			dir: getDir( lang ),
			type: 'standard'
		}
	}, callback )
}

const requestPcsSummary = ( lang, title, callback, request = cachedRequest ) => {
	const url = `https://${ lang }.wikipedia.org/api/rest_v1/page/summary/${ encodeURIComponent( title ) }?${ getAnalyticsQueryParam() }`
	request( url, ( data, err ) => {
		if ( !data ) {
			logError( msg( lang, 'preview-console-error-message', title, lang ), err )
			return false
		}
		if ( data.type === 'standard' || data.type === 'disambiguation' ) {
			return {
				title: data.titles.canonical,
				extractHtml: sanitizeHTML( data.extract_html ),
				imgUrl: data.thumbnail ? data.thumbnail.source : null,
				dir: data.dir,
				type: data.type
			}
		}
		// special case: there is no summary but there is a description
		if ( data.type === 'no-extract' && data.description ) {
			return {
				title: data.titles.canonical,
				extractHtml: '<p>' + data.description + '</p>',
				imgUrl: data.thumbnail ? data.thumbnail.source : null,
				dir: data.dir,
				type: 'standard'
			}
		}
		logError( msg( lang, 'preview-console-error-message', title, lang ), data )
		return false
	}, callback )

}

const simplify = ( node ) => {
	// remove a bunch of things
	const selector = [
		'script',
		'figure',
		'table',
		'sup.mw-ref',
		'.pcs-collapse-table-container',
		'.thumb',
		'.hatnote',
		"[ role='navigation' ]",
		'#pcs-edit-section-add-title-description'
	].join( ',' )
	for ( const n of node.querySelectorAll( selector ) ) {
		n.remove()
	}

	// unwrap links
	for ( const a of node.querySelectorAll( 'a' ) ) {
		a.outerHTML = a.innerHTML
	}

	// remove phonetic notations
	for ( const p of node.querySelectorAll( 'p' ) ) {
		p.innerHTML = p.innerHTML.replace( /\s\(.*?class=".*?(ext-phonos|IPA).*?".*?\)/g, '' )
	}

	return node
}

const extractSectionSummary = ( lang, title, section, callback, request ) => {
	const url = `https://${ lang }.wikipedia.org/api/rest_v1/page/mobile-html/${ encodeURIComponent( title ) }?${ getAnalyticsQueryParam() }`
	request( url, ( data, err ) => {
		if ( !data ) {
			logError( msg( lang, 'preview-console-error-message', title, lang ), err )
			return false
		}
		const doc = new DOMParser().parseFromString( data, 'text/html' )
		const sectionTitleElement = doc.querySelector( '.pcs-edit-section-title#' + section )
		const sectionElement = sectionTitleElement.closest( 'section' )
		let img = null
		const imgElement = sectionElement.querySelector( 'figure span.mw-file-element' )
		if ( imgElement ) {
			img = imgElement.getAttribute( 'data-src' )
		}
		return {
			title,
			extractHtml: simplify( sectionElement.querySelector( 'p' ) ).outerHTML,
			imgUrl: img,
			dir: doc.body.getAttribute( 'dir' ),
			type: 'standard'
		}
	}, callback, false )
}

const requestPagePreview = ( lang, title, callback, request = cachedRequest ) => {
	if ( title.indexOf( '#' ) === -1 ) {
		return title.indexOf( ':' ) === -1 ?
			requestPcsSummary( lang, title, callback, request ) :
			requestMwExtract( lang, title, callback, request )
	} else {
		const [ t, s ] = title.split( '#' )
		return extractSectionSummary( lang, t, s, callback, request )
	}
}

const requestPageMedia = ( lang, title, callback, request = cachedRequest ) => {
	title = titleWithoutSection( title )
	const url = `https://${ lang }.wikipedia.org/api/rest_v1/page/media-list/${ encodeURIComponent( title ) }`
	request( url, ( mediaListData ) => {
		const items = mediaListData.items || []
		const pageMedia = items.reduce( ( mediaArray, item ) => {
			if ( item.showInGallery && item.type === 'image' ) {
				const thumbnail = item && item.srcset && `https:${ item.srcset[ 0 ].src }`
				const media = {
					caption: item.caption && item.caption.text.trim(),
					thumb: thumbnail,
					title: item.title
				}

				return mediaArray.concat( media )
			}
			return mediaArray
		}, [] )

		return pageMedia

	}, callback )
}

const requestPageMediaInfo = ( lang, title, callback, request = cachedRequest ) => {
	const params = {
		action: 'query',
		prop: 'imageinfo',
		iiextmetadatafilter: 'License|LicenseShortName|ImageDescription|Artist',
		iiextmetadatalanguage: lang,
		iiextmetadatamultilang: 1,
		iiurlwidth: getDeviceSize().width,
		iiurlheight: getDeviceSize().height,
		iiprop: 'url|extmetadata',
		titles: title
	}

	const url = buildMwApiUrl( lang, params )

	request( url, ( mediaInfoData ) => {
		const pages = mediaInfoData.query.pages
		const imageInfo = pages[ 0 ].imageinfo

		if ( !imageInfo ) {
			return {}
		}

		const { Artist, ImageDescription, LicenseShortName } = imageInfo[ 0 ].extmetadata
		const author = Artist && strip( Artist.value )
		const description = ImageDescription && strip(
			( typeof ImageDescription.value === 'string' && ImageDescription.value ) ||
			( ImageDescription.value[ lang ] ||
				ImageDescription.value[ Object.keys( ImageDescription.value )[ 0 ] ] )
		)
		const imageUrl = imageInfo[ 0 ].thumburl

		return {
			author,
			description,
			license: LicenseShortName && LicenseShortName.value,
			filePage: convertUrlToMobile( imageInfo[ 0 ].descriptionshorturl ),
			bestFitImageUrl: imageUrl
		}
	}, callback )
}

export { requestPagePreview, requestPageMedia, requestPageMediaInfo }
