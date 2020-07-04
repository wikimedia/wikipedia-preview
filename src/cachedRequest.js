const request = ( url, callback ) => {
		const xhr = new XMLHttpRequest()
		xhr.open( 'GET', url )
		xhr.send()
		xhr.addEventListener( 'load', () => {
			callback( JSON.parse( xhr.responseText ) )
		} )
		xhr.addEventListener( 'error', () => {
			callback( null, xhr.status )
		} )
	},

	dataCache = {},

	cachedRequest = ( url, transformFn, callback, r = request ) => {
		if ( dataCache[ url ] !== undefined ) {
			callback( dataCache[ url ] )
			return
		}
		r( url, data => {
			if ( data ) {
				callback( dataCache[ url ] = transformFn( data ) )
			}
		} )
	}

export { cachedRequest }
