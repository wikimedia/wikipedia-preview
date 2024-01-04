import { describe, test, expect } from 'vitest'
import { cachedRequest } from '../src/cachedRequest.js'

const requestMock = ( data ) => {
	return ( url, callback ) => {
		callback( data )
	}
}

describe( 'cachedRequest', () => {
	test( 'executes the transform function', () => {
		return cachedRequest( 'url', ( d ) => `transformed ${ d }`, ( data ) => {
			expect( data ).toBe( 'transformed data' )
		}, requestMock( 'data' ) )
	} )

	test( 'caches transformed output per URL', () => {
		cachedRequest( 'url-2', () => 't-1', () => {
			cachedRequest( 'url-2', () => 't-2', ( data ) => {
				expect( data ).toBe( 't-1' )
			}, requestMock( 'data-2' ) )
		}, requestMock( 'data-1' ) )
	} )
} )
