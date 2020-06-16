const assert = require('assert')
const { requestPagePreview } = require('../src/api')

const requestMock = (data) => {
	return (url, transformFn, callback) => {
		callback(transformFn(data))
	}
}

describe('requestPagePreview', () => {
	it('accepts standard articles only', () => {
		requestPagePreview('lang', 'title', data => {
			assert.equal(data, false)
		}, requestMock({type: 'disambiguation'}))
	})

	it ('accepts ltr articles only', () => {
		requestPagePreview('lang', 'title', data => {
			assert.equal(data, false)
		}, requestMock({type: 'standard', dir: 'rtl'}))
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
		requestPagePreview('lang', 'title', data => {
			assert.deepEqual(data, transformedOutput)
		}, requestMock(apiOutput))
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
		requestPagePreview('lang', 'title', data => {
			assert.deepEqual(data, transformedOutput)
		}, requestMock(apiOutput))
	})

	it ('uses the specified language in the URL', () => {
		requestPagePreview('fr', 'title', () => {}, url => {
			assert(url.startsWith('https://fr.wikipedia.org/'))
		})
	})

	it ('encodes the page title in the URL', () => {
		requestPagePreview('fr', "L'Époque des Châteaux", () => {}, url => {
			assert(url.endsWith("L'%C3%89poque%20des%20Ch%C3%A2teaux"))
		})
	})
})
