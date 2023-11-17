import assert from 'assert'
import { describe, test, beforeAll } from 'vitest'
import { renderPreview } from '../src/preview'

describe( 'renderPreview', () => {
	describe( 'with image (in english)', () => {
		let output
		beforeAll( () => {
			output = renderPreview( 'en', {
				title: 'Cat',
				extractHtml: '<p>A small domesticated feline</p>',
				pageUrl: 'https://en.wikipedia.org/wiki/Cat',
				imgUrl: 'https://en.wikipedia.org/cat.png'
			}, false )
		} )
		test( 'renders something', () => assert( output ) )

		test( 'contains the extract HTML', () =>
			assert( output.includes( '<p>A small domesticated feline</p>' ) ) )

		test( 'contains the image url', () =>
			assert( output.includes( 'https://en.wikipedia.org/cat.png' ) ) )

		test( 'contains a link to the article', () =>
			assert( output.includes( '<a href="https://en.wikipedia.org/wiki/Cat?wprov=wppw2t"' ) ) )
	} )

	describe( 'without image (in french)', () => {
		let output
		beforeAll( () => {
			output = renderPreview( 'fr', {
				title: 'Chat',
				extractHtml: '<p>Un petit félin domestique</p>',
				pageUrl: 'https://fr.wikipedia.org/wiki/Chat',
				imgUrl: null
			}, false )
		} )
		test( 'renders something', () => assert( output ) )
	} )
} )
