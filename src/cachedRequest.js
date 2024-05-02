const request = ( url, callback, parseJson = true ) => {
	const xhr = new XMLHttpRequest()
	xhr.open( 'GET', url )
	xhr.send()
	xhr.addEventListener( 'load', () => {
		const content = parseJson ?
			JSON.parse( xhr.responseText ) :
			xhr.responseText
		callback( content )
	} )
	xhr.addEventListener( 'error', () => {
		callback( false, xhr.status )
	} )
}

const dataCache = {}

const cachedRequest = ( url, transformFn, callback, parseJson = true, r = request ) => {
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
	}, parseJson )
}

export { cachedRequest }
