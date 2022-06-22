'use strict'
const assert = require( 'assert' )
const { getWikipediaAttrFromUrl, sanitizeHTML } = require( '../src/utils' )

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
		{ url: 'https://es.wikipedia.org/wiki/82.ª_División_Aerotransportada', expected: { lang: 'es', mobile: false, title: '82.ª_División_Aerotransportada' } },
		{ url: 'https://en.wikipedia.org/wiki/Ā', expected: { lang: 'en', mobile: false, title: 'Ā' } },
		{ url: 'https://it.wikipedia.org/wiki/Željko_Obradović', expected: { lang: 'it', mobile: false, title: 'Željko_Obradović' } },
		{ url: 'https://en.wikipedia.org/wiki/&Burn', expected: { lang: 'en', mobile: false, title: '&Burn' } },
		{ url: 'https://en.wikipedia.org/wiki/ȏ', expected: { lang: 'en', mobile: false, title: 'ȏ' } },
		{ url: 'https://en.wikipedia.org/w/index.php?title=?!_(album)', expected: { lang: 'en', mobile: false, title: '?!_(album)' } },
		{ url: 'https://wikimediafoundation.org/', expected: null },
		{ url: 'https://en.wikipedia.org/wiki/Wikipedia:About', expected: { lang: 'en', mobile: false, title: 'Wikipedia:About' } },
		{ url: 'https://cs.wikipedia.org/wiki/Wikipedie:Studenti_p%25C3%25AD%25C5%25A1%25C3%25AD_Wikipedii', expected: { lang: 'cs', mobile: false, title: 'Wikipedie:Studenti_píší_Wikipedii' } },
		{ url: 'https://cs.wikipedia.org/wiki/Wikipedie:Studenti_p%C3%AD%C5%A1%C3%AD_Wikipedii', expected: { lang: 'cs', mobile: false, title: 'Wikipedie:Studenti_píší_Wikipedii' } },
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

describe( 'sanitizeHTML', () => {

	const tests = [
		{ html: '<b>This is a header</b>', expected: '<b>This is a header</b>' },
		{ html: '<p>This is a content</p>', expected: '<p>This is a content</p>' },
		{ html: 'Content without anything', expected: 'Content without anything' },
		{ html: '<p>embedded script</p><script>js tag</script>', expected: '<p>embedded script</p>' },
		{ html: '<script>first script</script><script>second</script>', expected: '' },
		{ html: '<script>first script</script >', expected: '' },
		{ html: '<script>alert(1)</\bscript><script>alert(1)</\0script> <script>\nalert(1)\n</script>', expected: '' },
		{ html: '<img src="" onload="">', expected: '<img src="">' }

	]

	const testFn = ( test ) => {
		it( `checks ${test.html}`, () => {
			const result = sanitizeHTML( test.html )
			assert.deepStrictEqual( result, test.expected )
		} )
	}

	// eslint-disable-next-line mocha/no-setup-in-describe
	tests.forEach( testFn )
} )
