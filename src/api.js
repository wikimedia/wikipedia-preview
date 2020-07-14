import { cachedRequest } from './cachedRequest'

const requestPagePreview = ( lang, title, isTouch, callback, request = cachedRequest ) => {

	const getMediaList = ( summaryData ) => {
			const url = `https://${lang}.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent( title )}`
			request( url, mediaListData => {
				const mediaList = mediaListData.items.reduce( ( mediaArray, item ) => {
					if ( item.showInGallery && item.type === 'image' ) {
						const source = item && item.srcset && `https:${item.srcset[ 0 ].src}`,
							media = {
								caption: item.caption && item.caption.text.trim(),
								src: source,
								title: item.title
							}

						return mediaArray.concat( media )
					}
					return mediaArray
				}, [] )

				return {
					summary: summaryData,
					media: mediaList
				}

			}, callback )
		},

		getSummary = () => {
			const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}`
			request( url, data => {
				if ( data.type === 'standard' && data.dir === 'ltr' ) {
					return {
						title: data.displaytitle,
						extractHtml: data.extract_html,
						pageUrl: isTouch ?
							data.content_urls.mobile.page :
							data.content_urls.desktop.page,
						imgUrl: data.thumbnail ? data.thumbnail.source : null
					}
				}
				return false
			}, getMediaList )
		}

	getSummary()

}

export { requestPagePreview }
