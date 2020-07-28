'use strict'
const assert = require( 'assert' )
const { requestPagePreview, requestPageMedia } = require( '../src/api' )

const requestMock = ( data ) => {
	return ( url, transformFn, callback ) => {
		callback( transformFn( data ) )
	}
}

describe( 'requestPagePreview', () => {
	it( 'accepts standard articles only', () => {
		requestPagePreview( 'lang', 'title', false, ( data ) => {
			assert.equal( data, false )
		}, requestMock( { type: 'disambiguation' } ) )
	} )

	it( 'accepts ltr articles only', () => {
		requestPagePreview( 'lang', 'title', false, ( data ) => {
			assert.equal( data, false )
		}, requestMock( { type: 'standard', dir: 'rtl' } ) )
	} )

	it( 'transforms the API output', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'ltr',
			displaytitle: 'Dog',
			/* eslint-disable camelcase */
			extract_html: '<p>A good boy</p>',
			content_urls: { desktop: { page: 'page-url' } },
			/* eslint-enable camelcase */
			thumbnail: { source: 'image-url' }
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			pageUrl: 'page-url',
			imgUrl: 'image-url'
		}
		requestPagePreview( 'lang', 'title', false, ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (without image)', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'ltr',
			displaytitle: 'Dog',
			/* eslint-disable camelcase */
			extract_html: '<p>A good boy</p>',
			content_urls: { desktop: { page: 'page-url' } }
			/* eslint-enable camelcase */
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			pageUrl: 'page-url',
			imgUrl: null
		}
		requestPagePreview( 'lang', 'title', false, ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'uses the specified language in the URL', () => {
		requestPagePreview( 'fr', 'title', false, () => {}, ( url ) => {
			assert( url.startsWith( 'https://fr.wikipedia.org/' ) )
		} )
	} )

	it( 'encodes the page title in the URL', () => {
		requestPagePreview( 'fr', "L'Époque des Châteaux", false, () => {}, ( url ) => {
			assert( url.endsWith( "L'%C3%89poque%20des%20Ch%C3%A2teaux" ) )
		} )
	} )
} )

describe( 'requestPageMedia', () => {
	it( 'transforms the API output', () => {
		const apiOutput = {
			items: [
				{
					/* eslint-disable camelcase */
					section_id: 0,
					/* eslint-enable camelcase */
					showInGallery: true,
					srcset: [
						{
							src: '//wikimedia.org/thumb/640px-cat.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/1280px-cat.jpg',
							scale: '2x'
						}
					],
					title: 'File:Cat_poster_1.jpg',
					type: 'image',
					caption: {
						html: 'Cats are popular within internet culture for some reason',
						text: 'Cats are popular within internet culture for some reason'
					}
				},
				{
					/* eslint-disable camelcase */
					section_id: 1,
					/* eslint-enable camelcase */
					showInGallery: true,
					srcset: [
						{
							src: '//wikimedia.org/thumb/640px-cat-skull.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/1280px-cat-skull.jpg',
							scale: '2x'
						}
					],
					title: 'File:Cat_skull_1.jpg',
					type: 'image',
					caption: {
						html: 'Skulls of a wildcat (top left) and a housecat (top right)',
						text: 'Skulls of a wildcat (top left) and a housecat (top right)'
					}
				}
			],
			revision: '1234',
			tid: '1234-abcd'
		}
		const transformedOutput = [
			{
				caption: 'Cats are popular within internet culture for some reason',
				src: 'https://wikimedia.org/thumb/640px-cat.jpg',
				title: 'File:Cat_poster_1.jpg'
			},
			{
				caption: 'Skulls of a wildcat (top left) and a housecat (top right)',
				src: 'https://wikimedia.org/thumb/640px-cat-skull.jpg',
				title: 'File:Cat_skull_1.jpg'
			}
		]
		requestPageMedia( 'en', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (without captions)', () => {
		const apiOutput = {
			items: [
				{
					/* eslint-disable camelcase */
					section_id: 0,
					/* eslint-enable camelcase */
					showInGallery: true,
					srcset: [
						{
							src: '//wikimedia.org/thumb/640px-cat.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/1280px-cat.jpg',
							scale: '2x'
						}
					],
					title: 'File:Cat_poster_1.jpg',
					type: 'image'
				},
				{
					/* eslint-disable camelcase */
					section_id: 1,
					/* eslint-enable camelcase */
					showInGallery: true,
					srcset: [
						{
							src: '//wikimedia.org/thumb/640px-cat-skull.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/1280px-cat-skull.jpg',
							scale: '2x'
						}
					],
					title: 'File:Cat_skull_1.jpg',
					type: 'image'
				}
			],
			revision: '1234',
			tid: '1234-abcd'
		}
		const transformedOutput = [
			{
				caption: undefined,
				src: 'https://wikimedia.org/thumb/640px-cat.jpg',
				title: 'File:Cat_poster_1.jpg'
			},
			{
				caption: undefined,
				src: 'https://wikimedia.org/thumb/640px-cat-skull.jpg',
				title: 'File:Cat_skull_1.jpg'
			}
		]
		requestPageMedia( 'en', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'uses the specified language in the URL', () => {
		requestPageMedia( 'es', 'title', () => {}, ( url ) => {
			assert( url.startsWith( 'https://es.wikipedia.org/' ) )
		} )
	} )

	it( 'encodes the page title in the URL', () => {
		requestPageMedia( 'zh', '貓', () => {}, ( url ) => {
			assert( url.endsWith( '%E8%B2%93' ) )
		} )
	} )
} )
