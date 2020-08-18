import { cachedRequest } from './cachedRequest'

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
							title: item.title
						}

					return mediaArray.concat( media )
				}
				return mediaArray
			}, [] )

			return pageMedia

		}, callback )
	}

export { requestPagePreview, requestPageMedia }
