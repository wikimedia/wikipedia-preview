import { cachedRequest } from './cachedRequest'
import { buildMwApiUrl, buildCommonsApiUrl, convertUrlToMobile, strip } from './utils'

const requestPagePreview = ( lang, title, isTouch, callback, request = cachedRequest ) => {
		const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}`
		request( url, data => {
			const allowedTypes = [ 'standard', 'disambiguation' ]
			if ( allowedTypes.indexOf( data.type ) !== -1 ) {
				return {
					title: data.displaytitle,
					extractHtml: data.extract_html,
					pageUrl: isTouch ?
						data.content_urls.mobile.page :
						data.content_urls.desktop.page,
					imgUrl: data.thumbnail ? data.thumbnail.source : null,
					dir: data.dir,
					type: data.type
				}
			}
			return false
		}, callback )

	},

	requestPageMedia = ( lang, title, callback, request = cachedRequest ) => {
		const url = `https://${lang}.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent( title )}`
		request( url, mediaListData => {
			const pageMedia = mediaListData.items.reduce( ( mediaArray, item ) => {
				if ( item.showInGallery && item.type === 'image' ) {
					const thumbnail = item && item.srcset && `https:${item.srcset[ 0 ].src}`,
						source = thumbnail.slice( 0, thumbnail.lastIndexOf( '/' ) ).replace( '/thumb', '' ),
						media = {
							caption: item.caption && item.caption.text.trim(),
							src: source,
							thumb: thumbnail,
							title: item.title,
							fromCommon: source.indexOf( '/commons' ) !== -1
						}

					return mediaArray.concat( media )
				}
				return mediaArray
			}, [] )

			return pageMedia

		}, callback )
	},

	requestPageMediaInfo = ( lang, title, fromCommon, callback, request = cachedRequest ) => {
		const params = {
				action: 'query',
				prop: 'imageinfo',
				iiextmetadatafilter: 'License|LicenseShortName|ImageDescription|Artist',
				iiextmetadatalanguage: lang,
				iiextmetadatamultilang: 1,
				iiprop: 'url|extmetadata',
				titles: title
			},

			url = fromCommon ? buildCommonsApiUrl( params ) : buildMwApiUrl( lang, params )

		request( url, mediaInfoData => {
			const pages = mediaInfoData.query.pages,
				imageInfo = pages[ 0 ].imageinfo

			if ( !imageInfo ) {
				return {}
			}

			let { Artist, ImageDescription, LicenseShortName } = imageInfo[ 0 ].extmetadata,
				author = Artist && strip( Artist.value ),
				description = ImageDescription && strip(
					( typeof ImageDescription.value === 'string' && ImageDescription.value ) ||
					( ImageDescription.value[ lang ] ||
						ImageDescription.value[ Object.keys( ImageDescription.value )[ 0 ] ] )
				)

			return {
				author,
				description,
				license: LicenseShortName && LicenseShortName.value,
				filePage: convertUrlToMobile( imageInfo[ 0 ].descriptionshorturl )
			}
		}, callback )
	}

export { requestPagePreview, requestPageMedia, requestPageMediaInfo }
