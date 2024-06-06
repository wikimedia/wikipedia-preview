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
	if ( !node ) {
		return null
	}
	// remove a bunch of things
	const selector = [
		'script',
		'meta',
		'style',
		'figure',
		'table',
		'sup.mw-ref',
		'sup.reference',
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

	if ( node.innerText.trim() === '' ) {
		return null
	}

	return node.outerHTML
}

const findLeadImageThumbnail = ( doc ) => {
	const leadImageElement = doc.querySelector( 'meta[property="mw:leadImage"]' )
	if ( !leadImageElement ) {
		return null
	}
	const parts = leadImageElement.getAttribute( 'content' ).split( '/' )
	const filename = decodeURIComponent( parts[ parts.length - 1 ] )
	const a = doc.querySelector( 'a[href*="' + filename + '"]' )
	if ( !a ) {
		return null
	}
	const span = a.querySelector( 'span[data-src]' )
	if ( span ) {
		return span.getAttribute( 'data-src' )
	}
	const img = a.querySelector( 'img[src]' )
	if ( img ) {
		return img.getAttribute( 'src' )
	}
	return null

}

const getSections = ( lang, title, callback, request = cachedRequest ) => {
	const url = `https://${ lang }.wikipedia.org/api/rest_v1/page/mobile-html/${ encodeURIComponent( title ) }?${ getAnalyticsQueryParam() }`
	request( url, ( data, err ) => {
		if ( !data ) {
			logError( msg( lang, 'preview-console-error-message', title, lang ), err )
			return false
		}
		const doc = new DOMParser().parseFromString( data, 'text/html' )
		const leadImageUrl = findLeadImageThumbnail( doc )
		const sections = Array.from( doc.querySelectorAll( 'section' ) ).map( ( sectionElement ) => {
			const sectionTitleElement = sectionElement.querySelector( 'h2, h3, h4, h5, h6' )
			const sectionId = sectionTitleElement ? sectionTitleElement.id : title
			const level = sectionTitleElement ? sectionTitleElement.tagName.toLowerCase() : 'h2'

			const imageElement = sectionElement.querySelector( 'figure span.mw-file-element' )
			const imgUrl = imageElement ?
				imageElement.getAttribute( 'data-src' ) :
				leadImageUrl

			const extractHtml = simplify(
				sectionElement.querySelector( 'p' )
			)

			return extractHtml ? {
				id: sectionId,
				level,
				imgUrl,
				extractHtml
			} : null
		} ).filter( ( s ) => s )
		return {
			sections,
			dir: doc.body.getAttribute( 'dir' )
		}
	}, callback, false )
}

const extractSectionSummary = ( lang, title, sectionId, callback, request ) => {
	getSections( lang, title, ( info ) => {
		for ( const section of info.sections ) {
			if ( section.id === sectionId ) {
				callback( {
					title: title + '#' + sectionId,
					extractHtml: section.extractHtml,
					imgUrl: section.imgUrl,
					dir: info.dir,
					type: 'standard'
				} )
				return
			}
		}
		callback( false )
	}, request )
}

const requestPagePreview = ( lang, title, callback, request = cachedRequest ) => {
	const [ titlePart, sectionPart ] = title.split( '#' )
	if ( !sectionPart ) {
		return title.indexOf( ':' ) === -1 ?
			requestPcsSummary( lang, title, callback, request ) :
			requestMwExtract( lang, title, callback, request )
	} else {
		return extractSectionSummary( lang, titlePart, sectionPart, callback, request )
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
		iiextmetadatafilter: 'LicenseShortName|ImageDescription|Artist',
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

export { requestPagePreview, requestPageMedia, requestPageMediaInfo, getSections }
