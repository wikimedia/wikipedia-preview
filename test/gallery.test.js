import { JSDOM } from 'jsdom'
import { describe, test, beforeAll, expect } from 'vitest'
import { showFullscreenGallery, getGalleryRow } from '../src/gallery/index.js'

describe( 'Gallery', () => {
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

		beforeAll( () => {
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

		test( 'renders full screen gallery with all images', () => {
			const fullscreenGallery = doc.querySelector( '.wp-gallery-fullscreen' ),
				images = fullscreenGallery.querySelectorAll( 'img' )

			expect( fullscreenGallery ).toBeTruthy()
			images.forEach( ( image, index ) => {
				expect( image.src ).toBe( mediaItems[ index ].src )
			} )

		} )

		test( 'closes full screen gallery when close button is clicked', () => {
			const closeButton = doc.querySelector( '.wp-gallery-fullscreen-close' )
			const galleryClassName = '.wp-gallery-fullscreen'

			expect( doc.querySelector( galleryClassName ) ).toBeTruthy()
			closeButton.click()
			expect( doc.querySelector( galleryClassName ) ).toBeFalsy()
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

		test( 'correctly constructs mini gallery row', () => {
			const galleryRow = getGalleryRow( mediaItems )

			Array.from( galleryRow.children ).forEach( ( image, index ) => {
				const thumb = image.style[ 'background-image' ].slice( 4, -1 )
				expect( thumb ).toBe( mediaItems[ index ].thumb )
				expect( image.className ).toBe( 'wikipediapreview-gallery-image' )
			} )
		} )
	} )
} )
