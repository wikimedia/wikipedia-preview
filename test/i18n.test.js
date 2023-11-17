import assert from 'assert'
import { describe, test } from 'vitest'

import { msg } from '../src/i18n'

import english from '../i18n/en.json'
const [ firstKey, firstValue ] = [ Object.keys( english )[ 0 ], Object.values( english )[ 0 ] ]

describe( 'msg', () => {
	test( 'returns the localized key', () => {
		assert.equal( msg( 'en', firstKey ), firstValue )
	} )
	test( 'falls back to english', () => {
		assert.equal( msg( 'asdf', firstKey ), firstValue )
	} )
	test( 'falls back to given key', () => {
		const nonExistedKey = 'i-do-not-think-this-existed'
		assert.equal( msg( 'en', nonExistedKey ), nonExistedKey )
	} )
	test( 'replaces parameters', () => {
		assert.equal(
			msg( 'en', 'preview-disambiguation-message', 'Cat' ),
			'Title <strong>Cat</strong> is related to more than one article on Wikipedia.'
		)
	} )
} )
