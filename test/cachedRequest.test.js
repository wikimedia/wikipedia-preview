'use strict'
const assert = require( 'assert' )
const { cachedRequest } = require( '../src/cachedRequest' )

const requestMock = ( data ) => {
	return ( url, callback ) => {
		callback( data )
	}
}

describe( 'cachedRequest', () => {
	it( 'executes the transform function', () => {
		return cachedRequest( 'url', ( d ) => `transformed ${d}`, ( data ) => {
			assert.equal( data, 'transformed data' )
		}, requestMock( 'data' ) )
	} )

	it( 'caches transformed output per URL', ( done ) => {
		cachedRequest( 'url-2', () => 't-1', () => {
			cachedRequest( 'url-2', () => 't-2', ( data ) => {
				assert.equal( data, 't-1' )
				done()
			}, requestMock( 'data-2' ) )
		}, requestMock( 'data-1' ) )
	} )
} )
