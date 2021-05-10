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
	// This function implements a 2-pointer horizontal pinch/zoom gesture.
	//
	// If the distance between the two pointers has increased (zoom in),
	// the taget element's background is changed to "pink" and if the
	// distance is decreasing (zoom out), the color is changed to "lightblue".
	//
	// This function sets the target element's border to "dashed" to visually
	// indicate the pointer's target received a move event.
	// console.log( 'pointerMove', ev )
	// ev.target.style.border = 'dashed'

	// eslint-disable-next-line no-debugger
	// debugger

	// console.log( 'ev.target...', ev.target )

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
				// ev.target.style.transform = 'scale(1.6)'
			}
			if ( curDiff < prevDiff ) {
				// The distance between the two pointers has decreased
				// console.log( 'Pinch moving IN -> Zoom out', ev )
				ev.target.style.border = '3px solid red'
				// ev.target.style.transform = 'scale(1.1)'
			}
		}

		// Cache the distance for the next move event
		prevDiff = curDiff
	}
}

const zoomEnd = ( ev ) => {
	removeEvent( ev )
	ev.target.style.border = 'none'

	// If the number of pointers down is less than two then reset diff tracker
	if ( evCache.length < 2 ) {
		prevDiff = -1
	}
}

export { getFingerAmount, prevDiff, zoomStart, zoomMove, zoomEnd }
