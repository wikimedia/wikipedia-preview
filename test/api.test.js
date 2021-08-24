'use strict'
const assert = require( 'assert' )
const { requestPagePreview, requestPageMedia, requestPageMediaInfo } = require( '../src/api' )

const requestMock = ( data ) => {
	return ( url, transformFn, callback ) => {
		callback( transformFn( data ) )
	}
}

describe( 'requestPagePreview', () => {
	it( 'transforms the API output', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'ltr',
			titles: { canonical: 'Dog' },
			/* eslint-disable camelcase */
			extract_html: '<p>A good boy</p>',
			/* eslint-enable camelcase */
			thumbnail: { source: 'image-url' }
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			imgUrl: 'image-url',
			dir: 'ltr',
			type: 'standard'
		}
		requestPagePreview( 'lang', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (without image, RTL)', () => {
		const apiOutput = {
			type: 'standard',
			dir: 'rtl',
			titles: { canonical: 'Dog' },
			/* eslint-disable camelcase */
			extract_html: '<p>A good boy</p>'
			/* eslint-enable camelcase */
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A good boy</p>',
			imgUrl: null,
			dir: 'rtl',
			type: 'standard'
		}
		requestPagePreview( 'lang', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (no-extract with description)', () => {
		const apiOutput = {
			type: 'no-extract',
			dir: 'rtl',
			titles: { canonical: 'Dog' },
			description: 'A short desc'
		}
		const transformedOutput = {
			title: 'Dog',
			extractHtml: '<p>A short desc</p>',
			imgUrl: null,
			dir: 'rtl',
			type: 'standard'
		}
		requestPagePreview( 'lang', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (no-extract NO description)', () => {
		const apiOutput = {
			type: 'no-extract',
			dir: 'rtl',
			titles: { canonical: 'Dog' }
		}
		requestPagePreview( 'lang', 'title', ( data ) => {
			assert.equal( data, false )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output (unsupported type)', () => {
		const apiOutput = {
			type: 'unsupported'
		}
		requestPagePreview( 'lang', 'title', ( data ) => {
			assert.equal( data, false )
		}, requestMock( apiOutput ) )
	} )

	it( 'uses the specified language in the URL', () => {
		requestPagePreview( 'fr', 'title', () => {}, ( url ) => {
			assert( url.startsWith( 'https://fr.wikipedia.org/' ) )
		} )
	} )

	it( 'encodes the page title in the URL', () => {
		requestPagePreview( 'fr', "L'Époque des Châteaux", () => {}, ( url ) => {
			assert( url.includes( "L'%C3%89poque%20des%20Ch%C3%A2teaux" ) )
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
							src: '//wikimedia.org/thumb/cat.jpg/640px-cat.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/cat.jpg/1280px-cat.jpg',
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
							src: '//wikimedia.org/thumb/cat-skull.jpg/640px-cat-skull.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/cat-skull.jpg/1280px-cat-skull.jpg',
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
				thumb: 'https://wikimedia.org/thumb/cat.jpg/640px-cat.jpg',
				title: 'File:Cat_poster_1.jpg'
			},
			{
				caption: 'Skulls of a wildcat (top left) and a housecat (top right)',
				thumb: 'https://wikimedia.org/thumb/cat-skull.jpg/640px-cat-skull.jpg',
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
							src: '//wikimedia.org/thumb/cat.jpg/640px-cat.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/cat.jpg/1280px-cat.jpg',
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
							src: '//wikimedia.org/thumb/cat-skull.jpg/640px-cat-skull.jpg',
							scale: '1x'
						},
						{
							src: '//wikimedia.org/thumb/cat-skull.jpg/1280px-cat-skull.jpg',
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
				thumb: 'https://wikimedia.org/thumb/cat.jpg/640px-cat.jpg',
				title: 'File:Cat_poster_1.jpg'
			},
			{
				caption: undefined,
				thumb: 'https://wikimedia.org/thumb/cat-skull.jpg/640px-cat-skull.jpg',
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

describe( 'requestPageMediaInfo', () => {
	it( 'transforms the API output', () => {
		const apiOutput = {
			batchcomplete: true,
			query: {
				normalized: [
					{
						fromencoded: false,
						from: 'File:Horn_Louvre_OA4069.jpg',
						to: 'File:Horn Louvre OA4069.jpg'
					}
				],
				pages: [
					{
						pageid: 916963,
						ns: 6,
						title: 'File:Horn Louvre OA4069.jpg',
						imagerepository: 'local',
						imageinfo: [
							{
								thumburl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Horn_Louvre_OA4069.jpg/375px-Horn_Louvre_OA4069.jpg',
								thumbwidth: 375,
								thumbheight: 218,
								url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Horn_Louvre_OA4069.jpg',
								descriptionurl: 'https://commons.wikimedia.org/wiki/File:Horn_Louvre_OA4069.jpg',
								descriptionshorturl: 'https://commons.wikimedia.org/w/index.php?curid=916963',
								extmetadata: {
									Artist: {
										value: '<div class="fn value">\n<span lang="en">Unknown artist</span>\n</div>',
										source: 'commons-desc-page'
									},
									ImageDescription: {
										value: {
											en: 'Olifant. Ivory, southern Italy, late 11th century.',
											fr: 'Olifant. Ivoire, Italie du Sud, fin du XIe siècle.',
											_type: 'lang'
										},
										source: 'commons-desc-page'
									},
									LicenseShortName: {
										value: 'Public domain',
										source: 'commons-desc-page',
										hidden: ''
									},
									License: {
										value: 'pd',
										source: 'commons-templates',
										hidden: ''
									}
								}
							}
						]
					}
				]
			}
		}
		const transformedOutput = {
			author: '\nUnknown artist\n',
			description: 'Olifant. Ivory, southern Italy, late 11th century.',
			filePage: 'https://commons.m.wikimedia.org/w/index.php?curid=916963',
			bestFitImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Horn_Louvre_OA4069.jpg/375px-Horn_Louvre_OA4069.jpg',
			license: 'Public domain'
		}
		requestPageMediaInfo( 'en', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )

	it( 'transforms the API output when image is not from Common', () => {
		const apiOutput = {
			continue: {
				iistart: '2006-09-08T11:50:16Z',
				continue: '||'
			},
			query: {
				normalized: [
					{
						fromencoded: false,
						from: 'File:Dunia_muundo.png',
						to: 'Picha:Dunia muundo.png'
					}
				],
				pages: [
					{
						pageid: 5145,
						ns: 6,
						title: 'Picha:Dunia muundo.png',
						imagerepository: 'local',
						imageinfo: [
							{
								thumburl: 'https://upload.wikimedia.org/wikipedia/sw/thumb/d/d7/Dunia_muundo.png',
								thumbwidth: 375,
								thumbheight: 218,
								url: 'https://upload.wikimedia.org/wikipedia/sw/d/d7/Dunia_muundo.png',
								descriptionurl: 'https://sw.wikipedia.org/wiki/Picha:Dunia_muundo.png',
								descriptionshorturl: 'https://sw.wikipedia.org/w/index.php?curid=5145',
								extmetadata: []
							}
						]
					}
				]
			}
		}
		const transformedOutput = {
			author: undefined,
			description: undefined,
			filePage: 'https://sw.m.wikipedia.org/w/index.php?curid=5145',
			bestFitImageUrl: 'https://upload.wikimedia.org/wikipedia/sw/thumb/d/d7/Dunia_muundo.png',
			license: undefined
		}
		requestPageMediaInfo( 'en', 'title', ( data ) => {
			assert.deepEqual( data, transformedOutput )
		}, requestMock( apiOutput ) )
	} )
} )
