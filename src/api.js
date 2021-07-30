import { cachedRequest } from './cachedRequest'
import {
	buildMwApiUrl, buildCommonsApiUrl, convertUrlToMobile,
	strip, getDeviceSize, sanitizeHTML, getAnalyticsQueryParam
} from './utils'

const requestPagePreview = ( lang, title, isTouch, callback, request = cachedRequest ) => {
	const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}?${getAnalyticsQueryParam()}`
	request( url, ( data ) => {
		if ( !data ) {
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
		return false
	}, callback )

}

const requestPageMedia = ( lang, title, callback, request = cachedRequest ) => {
	const url = `https://${lang}.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent( title )}`
	request( url, ( mediaListData ) => {
		const pageMedia = mediaListData.items.reduce( ( mediaArray, item ) => {
			if ( item.showInGallery && item.type === 'image' ) {
				const thumbnail = item && item.srcset && `https:${item.srcset[ 0 ].src}`
				const media = {
					caption: item.caption && item.caption.text.trim(),
					thumb: thumbnail,
					title: item.title,
					fromCommon: thumbnail.indexOf( '/commons' ) !== -1
				}

				return mediaArray.concat( media )
			}
			return mediaArray
		}, [] )

		return pageMedia

	}, callback )
}

const requestPageMediaInfo = ( lang, title, fromCommon, callback, request = cachedRequest ) => {
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

	const url = fromCommon ? buildCommonsApiUrl( params ) : buildMwApiUrl( lang, params )

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
