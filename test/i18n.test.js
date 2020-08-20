'use strict'
const assert = require( 'assert' )
const { msg } = require( '../src/i18n' )

const english = require( '../i18n/en.json' )
const [ firstKey, firstValue ] = [ Object.keys( english )[ 0 ], Object.values( english )[ 0 ] ]

describe( 'msg', () => {
	it( 'returns the localized key', () => {
		assert.equal( msg( 'en', firstKey ), firstValue )
	} )
	it( 'falls back to english', () => {
		assert.equal( msg( 'asdf', firstKey ), firstValue )
	} )
	it( 'falls back to given key', () => {
		const nonExistedKey = 'i-do-not-think-this-existed'
		assert.equal( msg( 'en', nonExistedKey ), nonExistedKey )
	} )
	it( 'replaces parameters', () => {
		assert.equal(
			msg( 'en', 'preview-disambiguation-message', 'Cat' ),
			'Title <strong>Cat</strong> is related to more than one article on Wikipedia.'
		)
	} )
} )
