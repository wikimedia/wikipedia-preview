const assert = require('assert')
const { cachedFetch } = require('../src/cachedFetch')

const fetchMock = (data) => {
	return () => {
		return Promise.resolve({json: () => Promise.resolve(data)})
	}
}

describe('cachedFetch', () => {
	it('executes the transform function', () => {
		return cachedFetch('url', d => `transformed ${d}`, fetchMock('data')).then((data) => {
			assert.equal(data, 'transformed data')
		})
	})

	it('caches transformed output per URL', (done) => {
		cachedFetch('url-2', d => 't-1', fetchMock()).then(() => {
			cachedFetch('url-2', d => 't-2', fetchMock()).then((data) => {
				assert.equal(data, 't-1')
				done()
			})
		})
	})

	it('caches fetch promises per URL', () => {
		const fetchPromise = new Promise(() => {})
		const promise1 = cachedFetch('url-3', d => d, () => fetchPromise)
		const promise2 = cachedFetch('url-3', d => d, () => fetchPromise)
		assert.equal(promise1, promise2)
	})
})
