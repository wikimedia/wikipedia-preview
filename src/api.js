import { cachedRequest } from './cachedRequest'

const fetchPagePreview = (lang, title, fetch=cachedRequest) => {
	var url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
	return fetch(url, (data) => {
		if (data.type !== 'standard') {
			// don't show popup for disambiguation or redirect
			return false
		}
		if (data.dir !== 'ltr') {
			return false
		}
		return {
			title: data.displaytitle,
			extractHtml: data.extract_html,
			pageUrl: data.content_urls.desktop.page,
			imgUrl: data.thumbnail ? data.thumbnail.source : null
		}
	})
}

export { fetchPagePreview }
