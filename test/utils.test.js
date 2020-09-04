'use strict'
const assert = require( 'assert' )
const { getWikipediaAttrFromUrl } = require( '../src/utils' )

describe( 'getWikipediaAttrFromUrl', () => {

	const tests = [
		{ url: 'https://en.wikipedia.org/wiki/Cat', expected: { lang: 'en', mobile: false, title: 'Cat' } },
		{ url: 'https://en.m.wikipedia.org/wiki/Cat', expected: { lang: 'en', mobile: true, title: 'Cat' } },
		{ url: 'https://he.wikipedia.org/wiki/ירח', expected: { lang: 'he', mobile: false, title: 'ירח' } },
		{ url: 'https://he.wikipedia.org/wiki/ירח#Section', expected: { lang: 'he', mobile: false, title: 'ירח' } },
		{ url: 'https://ru.wikipedia.org/wiki/Каменобродский,_Альфред_Адольфович', expected: { lang: 'ru', mobile: false, title: 'Каменобродский,_Альфред_Адольфович' } },
		{ url: 'https://zh.wikipedia.org/wiki/太阳帆', expected: { lang: 'zh', mobile: false, title: '太阳帆' } },
		{ url: 'https://zh.wikipedia.org/w/index.php?title=太阳帆&action=purge', expected: { lang: 'zh', mobile: false, title: '太阳帆' } },
		{ url: 'https://ar.wikipedia.org/wiki/كلية_التربية_النوعية_(جامعة_أسوان)', expected: { lang: 'ar', mobile: false, title: 'كلية_التربية_النوعية_(جامعة_أسوان)' } },
		{ url: 'https://en.wikipedia.org/wiki/Cat#Section', expected: { lang: 'en', mobile: false, title: 'Cat' } },
		{ url: 'https://en.wikipedia.org/wiki/Cat?action=edit', expected: { lang: 'en', mobile: false, title: 'Cat' } },
		{ url: 'https://de.wikipedia.org/w/index.php?title=Katze', expected: { lang: 'de', mobile: false, title: 'Katze' } },
		{ url: 'https://en.m.wikipedia.org/w/index.php?title=Cat&uselang=de', expected: { lang: 'en', mobile: true, title: 'Cat' } },
		{ url: 'https://es.wikipedia.org/wiki/82.ª_División_Aerotransportada', expected: { lang: 'es', mobile: false, title: '82.ª_División_Aerotransportada'} },
		{ url: 'https://en.wikipedia.org/wiki/Ā', expected: { lang: 'en', mobile: false, title: 'Ā' } },
		{ url: 'https://it.wikipedia.org/wiki/Željko_Obradović', expected: { lang: 'it', mobile: false, title: 'Željko_Obradović' } },
		{ url: 'https://en.wikipedia.org/wiki/&Burn', expected: { lang: 'en', mobile: false, title: '&Burn' } },
		{ url: 'https://en.wikipedia.org/wiki/ȏ', expected: { lang: 'en', mobile: false, title: 'ȏ' } },
		{ url: 'https://en.wikipedia.org/w/index.php?title=?!_(album)', expected: { lang: 'en', mobile: false, title: '?!_(album)' } },
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
