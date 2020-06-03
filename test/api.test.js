const assert = require('assert')
const { fetchPagePreview } = require('../src/api')

const fetchMock = (data) => {
	return (url, transformFn) => {
		return Promise.resolve(transformFn(data))
	}
}

describe('fetchPagePreview', () => {
	it('accepts standard articles only', () => {
		fetchPagePreview('lang', 'title', fetchMock({type: 'disambiguation'})).then((data) => {
			assert.equal(data, false)
		})
	})

	it ('accepts ltr articles only', () => {
		return fetchPagePreview('lang', 'title', fetchMock({type: 'standard', dir: 'rtl'})).then((data) => {
			assert.equal(data, false)
		})
	})

	it ('transforms the API output', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'ltr',
			displaytitle: 'Dog',
			extract_html: '<p>A good boy</p>',
			content_urls: { desktop: {page: 'page-url'}},
			thumbnail: {source: 'image-url'}
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			pageUrl: 'page-url',
			imgUrl: 'image-url'
		}
		return fetchPagePreview('lang', 'title', fetchMock(apiOutput)).then((data) => {
			assert.deepEqual(data, transformedOutput)
		})
	})

	it ('transforms the API output (without image)', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'ltr',
			displaytitle: 'Dog',
			extract_html: '<p>A good boy</p>',
			content_urls: { desktop: {page: 'page-url'}}
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			pageUrl: 'page-url',
			imgUrl: null
		}
		return fetchPagePreview('lang', 'title', fetchMock(apiOutput)).then((data) => {
			assert.deepEqual(data, transformedOutput)
		})
	})

	it ('uses the specified language in the URL', () => {
		return fetchPagePreview('fr', 'title', (url) => {
			assert(url.startsWith('https://fr.wikipedia.org/'))
		})
	})

	it ('encodes the page title in the URL', () => {
		return fetchPagePreview('fr', "L'Époque des Châteaux", (url) => {
			assert(url.endsWith("L'%C3%89poque%20des%20Ch%C3%A2teaux"))
		})
	})
})