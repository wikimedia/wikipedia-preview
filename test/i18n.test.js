const assert = require('assert')
const { msg } = require('../src/i18n')

describe('msg', () => {
	it('returns the localized key', () => {
		assert.equal(msg('fr', 'wikipedia'), 'Wikipédia')
	})
	it('falls back to english', () => {
		assert.equal(msg('asdf', 'wikipedia'), 'Wikipedia')
	})
})