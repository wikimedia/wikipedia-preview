'use strict'
const assert = require( 'assert' )
const { JSDOM } = require( 'jsdom' )
const { showFullscreenGallery, GalleryRow } = require( '../src/gallery' )

describe( 'showFullscreenGallery', () => {
	let dom,
		doc

	const mediaItems = [
			{
				caption: 'The first cat',
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_1.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_1.jpg',
				title: 'File:Cat_1.jpg'
			},
			{
				caption: 'The second cat',
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_2.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_2.jpg',
				title: 'File:Cat_2.jpg'
			},
			{
				caption: 'The third cat',
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_3.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_3.jpg',
				title: 'File:Cat_3.jpg'
			}
		],

		mockPopup = {
			element: null,
			lang: 'en',
			dir: 'ltr'
		}

	before( () => {
		dom = new JSDOM( `
			<html>
				<body>
					<div class="mock-popup">
						<div class="wikipediapreview-gallery"></div>
					</div>
				</body>
			</html>
		` )

		doc = dom.window.document
		mockPopup.element = doc.querySelector( '.mock-popup' )
		showFullscreenGallery(
			mediaItems, mediaItems[ 0 ].thumb, mockPopup.lang, mockPopup.dir, doc.body
		)
	} )

	it( 'renders full screen gallery with selected image', () => {
		const fullscreenGallery = doc.querySelector( '.wp-gallery-fullscreen' ),
			image = doc.querySelector( '.wp-gallery-fullscreen-image' )

		assert.ok( fullscreenGallery )
		assert.equal( image.children[ 0 ].src, mediaItems[ 0 ].src )
	} )

	it( 'renders next image when next button is clicked', () => {
		const nextButton = doc.querySelectorAll( '.wp-gallery-fullscreen-button.next' )[ 0 ],
			image = doc.querySelector( '.wp-gallery-fullscreen-image' )

		nextButton.click()
		assert.equal( image.children[ 0 ].src, mediaItems[ 1 ].src )
	} )

	it( 'renders previous image when previous button is clicked', () => {
		const previousButton = doc.querySelectorAll( '.wp-gallery-fullscreen-button.previous' )[ 0 ],
			image = doc.querySelector( '.wp-gallery-fullscreen-image' )

		previousButton.click()
		assert.equal( image.children[ 0 ].src, mediaItems[ 0 ].src )

	} )

	it( 'closes full screen gallery when close button is clicked', () => {
		const closeButton = doc.querySelectorAll( '.wp-gallery-fullscreen-button.close' )[ 0 ],
			galleryContainer = doc.querySelector( '.wikipediapreview-gallery' )

		closeButton.click()
		assert.ifError( galleryContainer.children[ 0 ] )
	} )
} )

describe( 'getGalleryRow', () => {
	let dom, doc
	const mediaItems = [
		{
			caption: 'The first cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_1.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_1.jpg',
			title: 'File:Cat_1.jpg'
		},
		{
			caption: 'The second cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_2.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_2.jpg',
			title: 'File:Cat_2.jpg'
		},
		{
			caption: 'The third cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_3.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_3.jpg',
			title: 'File:Cat_3.jpg'
		}
	]

	it( 'correctly constructs mini gallery row', () => {
		const galleryRow = GalleryRow( mediaItems )

		dom = new JSDOM( galleryRow.template )
		doc = dom.window.document
		Array.from(
			doc.querySelector( galleryRow.ui.container ).children
		).forEach( ( image, index ) => {
			const thumb = image.style[ 'background-image' ].slice( 4, -1 )
			assert.equal( thumb, mediaItems[ index ].thumb )
			assert.equal( image.className, 'wikipediapreview-gallery-image' )
		} )
	} )
} )
