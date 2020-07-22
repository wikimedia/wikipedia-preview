'use strict'
const assert = require( 'assert' )
const { JSDOM } = require( 'jsdom' )
const { renderPreview, renderPreviewMedia } = require( '../src/preview' )

describe( 'renderPreview', () => {
	describe( 'with image (in english)', () => {
		let output
		before( () => {
			output = renderPreview( 'en', {
				title: 'Cat',
				extractHtml: '<p>A small domesticated feline</p>',
				pageUrl: 'https://en.wikipedia.org/wiki/Cat',
				imgUrl: 'https://en.wikipedia.org/cat.png'
			}, false )
		} )
		it( 'renders something', () => assert( output ) )

		it( 'contains the extract HTML', () =>
			assert( output.includes( '<p>A small domesticated feline</p>' ) ) )

		it( 'contains the image url', () =>
			assert( output.includes( 'https://en.wikipedia.org/cat.png' ) ) )

		it( 'contains a link to the article', () =>
			assert( output.includes( '<a href="https://en.wikipedia.org/wiki/Cat"' ) ) )
	} )

	describe( 'without image (in french)', () => {
		let output
		before( () => {
			output = renderPreview( 'fr', {
				title: 'Chat',
				extractHtml: '<p>Un petit félin domestique</p>',
				pageUrl: 'https://fr.wikipedia.org/wiki/Chat',
				imgUrl: null
			}, false )
		} )
		it( 'renders something', () => assert( output ) )
	} )
} )

describe( 'renderPreviewMedia', () => {
	let dom,
		doc

	before( () => {
		dom = new JSDOM( `
			<html>
				<body>
					<div class="wikipediapreview">
						<div class="wikipediapreview-header"></div>
						<div class="wikipediapreview-body">
							<div class="wikipediapreview-gallery"></div>
						</div>
						<div class="wikipediapreview-footer"></div>
					</div>
				</body>
			</html>
		` )

		doc = dom.window.document
	} )

	it( 'renders media within gallery', () => {
		const mediaList = [
			{
				caption: 'The first cat',
				src: 'https://upload.wikimedia.org/640px-Cat_1.jpg',
				title: 'File:Cat_1.jpg'
			},
			{
				caption: 'The second cat',
				src: 'https://upload.wikimedia.org/640px-Cat_2.jpg',
				title: 'File:Cat_2.jpg'
			},
			{
				caption: 'The third cat',
				src: 'https://upload.wikimedia.org/640px-Cat_3.jpg',
				title: 'File:Cat_3.jpg'
			}
		]

		renderPreviewMedia( doc, mediaList )

		const gallery = doc.querySelector( '.wikipediapreview-gallery' ),
			galleryRow = gallery.children[ 0 ]

		assert( galleryRow.className, 'wikipediapreview-gallery-row' )

		Array.from( galleryRow.children ).forEach( ( image, index ) => {
			const src = image.style[ 'background-image' ].slice( 4, -1 )
			assert.equal( src, mediaList[ index ].src )
		} )
	} )
} )
