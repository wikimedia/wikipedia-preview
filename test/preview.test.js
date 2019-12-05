const assert = require('assert')
const { renderPreview } = require('../src/preview')

describe('renderPreview', () => {
	describe('with image (in english)', () => {
		let output
		before( () => {
			output = renderPreview('en', {
				title: 'Cat',
				extractHtml: '<p>A small domesticated feline</p>',
				pageUrl: 'https://en.wikipedia.org/wiki/Cat',
				imgUrl: 'https://en.wikipedia.org/cat.png'
			})
		})
		it('renders something', () => assert(output))

		it('contains the title', () => 
			assert(output.includes('<div class="wp-title">Cat</div>')))

		it('contains the extract HTML', () => 
			assert(output.includes('<p>A small domesticated feline</p>')))

		it('contains the image url', () => 
			assert(output.includes('https://en.wikipedia.org/cat.png')))

		it('contains a link to the article', () => 
			assert(output.includes('<a href="https://en.wikipedia.org/wiki/Cat"')))
	})

	describe('without image (in french)', () => {
		let output
		before( () => {
			output = renderPreview('fr', {
				title: 'Chat',
				extractHtml: '<p>Un petit félin domestique</p>',
				pageUrl: 'https://fr.wikipedia.org/wiki/Chat',
				imgUrl: null
			})
		})
		it('renders something', () => assert(output))

		it('contains the localized name of Wikipedia', () => 
			assert(output.includes('Wikipédia')))
	})
})
