let evCache = []
let prevDiff = -1

const getFingerAmount = () => {
	return evCache.length
}

const removeEvent = ( ev ) => {
	// Remove this event from the target's cache
	for ( var i = 0; i < evCache.length; i++ ) {
		if ( evCache[ i ].pointerId === ev.pointerId ) {
			evCache.splice( i, 1 )
			break
		}
	}
}

const zoomStart = ( ev ) => {
	// The pointerdown event signals the start of a touch interaction.
	// This event is cached to support 2-finger gestures
	evCache.push( ev )
}

const zoomMove = ( ev ) => {
	const image = ev.target.nodeName === 'IMG' ? ev.target : ev.target.querySelector( 'img' )

	const delta = 0.1
	const min = 1
	const max = 2
	let scale = image.style.transform ? Number( image.style.transform.slice( 6, -1 ) ) : min
	console.log( 'INITIAL SCALE...', scale )

	// Find this event in the cache and update its record with this event
	for ( var i = 0; i < evCache.length; i++ ) {
		if ( ev.pointerId === evCache[ i ].pointerId ) {
			evCache[ i ] = ev
			break
		}
	}

	// If two pointers are down, check for pinch gestures
	if ( evCache.length === 2 ) {
		// Calculate the distance between the two pointers
		var curDiff = Math.abs( evCache[ 0 ].clientX - evCache[ 1 ].clientX )

		if ( prevDiff > 0 ) {
			if ( curDiff > prevDiff ) {
				// The distance between the two pointers has increased
				// console.log( 'Pinch moving OUT -> Zoom in', ev )
				ev.target.style.border = '3px solid green'
				console.log( 'scale...', scale )
				if ( scale + delta < max ) {
					scale += delta
					ev.target.style.transform = `scale(${scale})`
				}
			}
			if ( curDiff < prevDiff ) {
				// The distance between the two pointers has decreased
				// console.log( 'Pinch moving IN -> Zoom out', ev )
				ev.target.style.border = '3px solid red'
				if ( scale - delta > min ) {
					scale -= delta
					ev.target.style.transform = `scale(${scale})`
				}
			}
		}

		// Cache the distance for the next move event
		prevDiff = curDiff
	}
}

const zoomEnd = ( ev ) => {
	removeEvent( ev )
	ev.target.style.border = 'none' // TODO - you can remove this border, but do we need to set anything else on zoomEnd

	// If the number of pointers down is less than two then reset diff tracker
	if ( evCache.length < 2 ) {
		prevDiff = -1
	}
}

export { getFingerAmount, prevDiff, zoomStart, zoomMove, zoomEnd }
