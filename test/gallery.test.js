'use strict'
const assert = require( 'assert' )
const { JSDOM } = require( 'jsdom' )
const { showFullscreenGallery, getGalleryRow } = require( '../src/gallery' )

describe( 'showFullscreenGallery', () => {
	let dom,
		doc

	const mediaItems = [
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
    ],
    
		mockEvent = {
			target: {
				style: {
					backgroundImage: 'url("https://upload.wikimedia.org/640px-Cat_2.jpg")'
				}
			}
		}

	before( () => {
		dom = new JSDOM( `
			<html>
        <body></body>
			</html>
		` )

		doc = dom.window.document
		showFullscreenGallery( mockEvent, mediaItems, doc )
	} )

	it( 'renders full screen gallery with selected image', () => {
		const fullscreenGallery = doc.querySelector( '.wp-gallery-popup' ),
			image = doc.querySelector( '.wp-gallery-popup-image' )

		assert.ok( fullscreenGallery )
		assert.equal( doc.body.children[ 0 ].className, fullscreenGallery.className )
		assert.equal( image.children[ 0 ].src, mediaItems[ 1 ].src )
	} )

	it( 'renders next image when next button is clicked', () => {
		const nextButton = doc.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			image = doc.querySelector( '.wp-gallery-popup-image' )

		nextButton.click()
		assert.equal( image.children[ 0 ].src, mediaItems[ 2 ].src )
	} )

	it( 'renders previous image when previous button is clicked', () => {
		const previousButton = doc.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			image = doc.querySelector( '.wp-gallery-popup-image' )

		previousButton.click()
		assert.equal( image.children[ 0 ].src, mediaItems[ 1 ].src )

	} )

	it( 'closes full screen gallery when close button is clicked', () => {
		const closeButton = doc.querySelectorAll( '.wp-gallery-popup-button.close' )[ 0 ]

		closeButton.click()
		assert.ifError( doc.body.children[ 0 ] )
	} )
} )

describe( 'getGalleryRow', () => {
	const mediaItems = [
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

	it( 'correctly constructs mini gallery row', () => {
		const galleryRow = getGalleryRow( mediaItems )

		Array.from( galleryRow.children ).forEach( ( image, index ) => {
			const src = image.style[ 'background-image' ].slice( 4, -1 )
			assert.equal( src, mediaItems[ index ].src )
			assert.equal( image.className, 'wikipediapreview-gallery-image' )
		} )
	} )
} )
