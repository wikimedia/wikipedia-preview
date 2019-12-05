import fetch from 'unfetch'

const dataCache = {}
const requestCache = {}
const cachedFetch = (url, transformFn, f=fetch) => {
	if (typeof dataCache[url] !== 'undefined') {
		return Promise.resolve(dataCache[url])
	}
	if (requestCache[url]) {
		return requestCache[url]
	}
	// todo: figure out how to sent client-specific analytics tracking
	// const headers = { 'X-Analytics': 'wikipedia-preview-' + clientId };
	return requestCache[url] = f(url)
		.then(response => response.json())
		.then(data => transformFn(data))
		.then(data => {
			dataCache[url] = data
			return data
		})
}

export { cachedFetch }
