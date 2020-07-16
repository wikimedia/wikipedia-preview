'use strict'
const assert = require( 'assert' )
const { getWikipediaAttrFromUrl } = require( '../src/utils' )

describe( 'getWikipediaAttrFromUrl', () => {

	const tests = [
		{ url: 'https://en.wikipedia.org/wiki/Cat', expected: { lang: 'en', mobile: false, title: 'Cat' } },
		{ url: 'https://en.m.wikipedia.org/wiki/Cat', expected: { lang: 'en', mobile: true, title: 'Cat' } },
		{ url: 'https://en.wikipedia.org/wiki/Cat#Section', expected: { lang: 'en', mobile: false, title: 'Cat' } },
		{ url: 'https://de.wikipedia.org/w/index.php?title=Katze', expected: { lang: 'de', mobile: false, title: 'Katze' } },
		{ url: 'https://en.m.wikipedia.org/w/index.php?title=Cat&uselang=de', expected: { lang: 'en', mobile: true, title: 'Cat' } },
		{ url: 'https://wikimediafoundation.org/', expected: null }
	]

	const testFn = ( test ) => {
		it( `checks ${test.url}`, () => {
			const result = getWikipediaAttrFromUrl( test.url )
			assert.deepStrictEqual( result, test.expected )
		} )
	}

	// eslint-disable-next-line mocha/no-setup-in-describe
	tests.forEach( testFn )
} )
