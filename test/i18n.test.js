import { describe, test, expect } from 'vitest'

import { msg } from '../src/i18n.js'

import english from '../i18n/en.json'
const [ firstKey, firstValue ] = [ Object.keys( english )[ 0 ], Object.values( english )[ 0 ] ]

describe( 'msg', () => {
	test( 'returns the localized key', () => {
		expect( msg( 'en', firstKey ) ).toBe( firstValue )
	} )
	test( 'falls back to english', () => {
		expect( msg( 'asdf', firstKey ) ).toBe( firstValue )
	} )
	test( 'falls back to given key', () => {
		const nonExistedKey = 'i-do-not-think-this-existed'
		expect( msg( 'en', nonExistedKey ) ).toBe( nonExistedKey )
	} )
	test( 'replaces parameters', () => {
		expect(
			msg( 'en', 'preview-disambiguation-message', 'Cat' ) ).toBe(
			'Title <strong>Cat</strong> is related to more than one article on Wikipedia.'
		)
	} )
} )
