const request = ( url, callback ) => {
	const xhr = new XMLHttpRequest()
	xhr.open( 'GET', url )
	xhr.send()
	xhr.addEventListener( 'load', () => {
		callback( JSON.parse( xhr.responseText ) )
	} )
	xhr.addEventListener( 'error', () => {
		callback( false, xhr.status )
	} )
}

const dataCache = {}

const cachedRequest = ( url, transformFn, callback, r = request ) => {
	if ( dataCache[ url ] !== undefined ) {
		callback( dataCache[ url ] )
		return
	}
	r( url, ( data, err ) => {
		if ( data ) {
			callback( dataCache[ url ] = transformFn( data ) )
		} else {
			callback( false, err )
		}
	} )
}

export { cachedRequest }
