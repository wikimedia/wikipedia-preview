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
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_1.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_1.jpg',
				title: 'File:Cat_poster_1.jpg'
			},
			{
				caption: 'The second cat',
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_2.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_2.jpg',
				title: 'File:Wild-domestic-hybrid_cat_skulls.png'
			},
			{
				caption: 'The third cat',
				thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_3.jpg',
				src: 'https://upload.wikimedia.org/640px-Cat_3.jpg',
				title: 'File:Tomb_of_Nakht_(7).jpg'
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

	it( 'renders full screen gallery with all images', () => {
		const fullscreenGallery = doc.querySelector( '.wp-gallery-fullscreen' ),
			images = fullscreenGallery.querySelectorAll( 'img' )

		assert.ok( fullscreenGallery )
		images.forEach( ( image, index ) => {
			assert.equal( image.src, mediaItems[ index ].src )
		} )

	} )

	it( 'closes full screen gallery when close button is clicked', () => {
		const closeButton = doc.querySelector( '.wp-gallery-fullscreen-close' )

		closeButton.click()
		assert.ifError( doc.querySelector( '.wp-gallery-fullscreen' ) )
	} )
} )

describe( 'getGalleryRow', () => {
	const mediaItems = [
		{
			caption: 'The first cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_1.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_1.jpg',
			title: 'File:Cat_poster_1.jpg'
		},
		{
			caption: 'The second cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_2.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_2.jpg',
			title: 'File:Wild-domestic-hybrid_cat_skulls.png'
		},
		{
			caption: 'The third cat',
			thumb: 'https://upload.wikimedia.org/thumb/640px-Cat_3.jpg',
			src: 'https://upload.wikimedia.org/640px-Cat_3.jpg',
			title: 'File:Tomb_of_Nakht_(7).jpg'
		}
	]

	it( 'correctly constructs mini gallery row', () => {
		const galleryRow = getGalleryRow( mediaItems )

		Array.from( galleryRow.children ).forEach( ( image, index ) => {
			const thumb = image.style[ 'background-image' ].slice( 4, -1 )
			assert.equal( thumb, mediaItems[ index ].thumb )
			assert.equal( image.className, 'wikipediapreview-gallery-image' )
		} )
	} )
} )
