import { cachedRequest } from './cachedRequest'

const requestPagePreview = ( lang, title, isTouch, callback, request = cachedRequest ) => {
	var url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}`
	request( url, data => {
		if ( data.type === 'standard' && data.dir === 'ltr' ) {
			return {
				title: data.displaytitle,
				extractHtml: data.extract_html,
				pageUrl: isTouch ? data.content_urls.mobile.page : data.content_urls.desktop.page,
				imgUrl: data.thumbnail ? data.thumbnail.source : null
			}
		}
		return false
	}, callback )
}

export { requestPagePreview }
