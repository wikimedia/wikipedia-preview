import { describe, test, beforeAll, expect } from 'vitest'
import { renderPreview } from '../src/preview.js'

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
		test( 'renders something', () => expect( output ).toBeTruthy() )

		test( 'contains the extract HTML', () =>
			expect( output.includes( '<p>A small domesticated feline</p>' ) ).toBeTruthy() )

		test( 'contains the image url', () =>
			expect( output.includes( 'https://en.wikipedia.org/cat.png' ) ).toBeTruthy() )

		test( 'contains a link to the article', () =>
			expect( output.includes( '<a href="https://en.wikipedia.org/wiki/Cat?wprov=wppw2t"' ) ).toBeTruthy() )
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
		test( 'renders something', () => expect( output ).toBeTruthy() )
	} )
} )
