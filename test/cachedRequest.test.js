import assert from 'assert'
import { describe, test } from 'vitest'
import { cachedRequest } from '../src/cachedRequest'

const requestMock = ( data ) => {
	return ( url, callback ) => {
		callback( data )
	}
}

describe( 'cachedRequest', () => {
	test( 'executes the transform function', () => {
		return cachedRequest( 'url', ( d ) => `transformed ${d}`, ( data ) => {
			assert.equal( data, 'transformed data' )
		}, requestMock( 'data' ) )
	} )

	test( 'caches transformed output per URL', () => {
		cachedRequest( 'url-2', () => 't-1', () => {
			cachedRequest( 'url-2', () => 't-2', ( data ) => {
				assert.equal( data, 't-1' )
			}, requestMock( 'data-2' ) )
		}, requestMock( 'data-1' ) )
	} )
} )
