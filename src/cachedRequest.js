
const request = (url, callback) => {
	const xhr = new XMLHttpRequest()
	xhr.responseType = 'json'
	xhr.open('GET', url)
	xhr.send()
	xhr.addEventListener('load', () => {
		callback(xhr.response)
	})
}

const dataCache = {}

const cachedRequest = (url, transformFn, callback, r=request) => {
	if (dataCache[url]) {
		callback(dataCache[url])
		return
	}
	r(url, data => {
		callback(dataCache[url] = transformFn(data))
	})
}

export { cachedRequest }
