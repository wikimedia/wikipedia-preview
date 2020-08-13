import { cachedRequest } from './cachedRequest'

const requestPagePreview = ( lang, title, isTouch, callback, request = cachedRequest ) => {
		const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}`
		request( url, data => {
			if ( data.type === 'standard' ) {
				return {
					title: data.displaytitle,
					extractHtml: data.extract_html,
					pageUrl: isTouch ?
						data.content_urls.mobile.page :
						data.content_urls.desktop.page,
					imgUrl: data.thumbnail ? data.thumbnail.source : null,
					dir: data.dir
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

	// TODO - these non-request methods could go in utils
	defaultParams = {
		format: 'json',
		formatversion: 2,
		origin: '*'
	},

	buildMwApiUrl = ( lang, params ) => {
		// params = Object.assign( {}, defaultParams, params )
		params = { ...defaultParams, ...params }
		const baseUrl = `https://${lang}.wikipedia.org/w/api.php`
		return baseUrl + '?' + Object.keys( params ).map( p => {
			return `${p}=${encodeURIComponent( params[ p ] )}`
		} ).join( '&' )
	},

	buildCommonsApiUrl = params => {
		// params = Object.assign( {}, defaultParams, params )
		params = { ...defaultParams, ...params }
		const baseUrl = 'https://commons.wikimedia.org/w/api.php'
		return baseUrl + '?' + Object.keys( params ).map( p => {
			return `${p}=${encodeURIComponent( params[ p ] )}`
		} ).join( '&' )
	},

	convertUrlToMobile = url => {
		return url.replace( /https:\/\/(.*?)\./, subDomain => subDomain + 'm.' )
	},

	strip = html => {
		const doc = new DOMParser().parseFromString( html, 'text/html' )
		return doc.body.textContent || ''
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
