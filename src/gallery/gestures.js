let evCache = []
let prevDiff = -1
let zoomedIn = false
const temp = {
	screenX: null,
	originalMarginLeft: null,
	currentMarginLeft: null,
	originalTransition: null,
	durationStart: null
}

const isInvalidEvent = ( e, items, current, captionText, prefixClassname ) => {
	return e.target.className === captionText &&
			items[ current ].querySelector( `.${prefixClassname}-item-caption-expand-cue` ) ||
			e.pointerType !== 'touch'
}

const isImgZoomedIn = () => {
	return zoomedIn
}

const getFingerAmount = () => {
	return evCache.length
}

const removeEvent = ( ev ) => {
	// Remove this event from the target's cache
	for ( let i = 0; i < evCache.length; i++ ) {
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
	const max = 4
	let scale = image.style.transform ? Number( image.style.transform.slice( 6, -1 ) ) : min

	// Find this event in the cache and update its record with this event
	for ( let i = 0; i < evCache.length; i++ ) {
		if ( ev.pointerId === evCache[ i ].pointerId ) {
			evCache[ i ] = ev
			break
		}
	}

	// If two pointers are down, check for pinch gestures
	if ( evCache.length === 2 ) {
		// Calculate the distance between the two pointers
		let curDiff = Math.abs( evCache[ 0 ].clientX - evCache[ 1 ].clientX )

		if ( prevDiff > 0 ) {
			if ( curDiff > prevDiff ) {
				// The distance between the two pointers has increased
				// console.log( 'Pinch moving OUT -> Zoom in', ev )
				// ev.target.style.border = '3px solid green'
				zoomedIn = true
				if ( scale + delta < max ) {
					scale += delta
					ev.target.style.transform = `scale(${scale})`
				}
			}
			if ( curDiff < prevDiff ) {
				// The distance between the two pointers has decreased
				// console.log( 'Pinch moving IN -> Zoom out', ev )
				// ev.target.style.border = '3px solid red'
				if ( scale - delta > min ) {
					scale -= delta
					ev.target.style.transform = `scale(${scale})`
				} else {
					ev.target.style.transform = 'scale(1)'
					zoomedIn = false
				}
			}
		}

		// Cache the distance for the next move event
		prevDiff = curDiff
	}
}

const zoomEnd = ( ev ) => {
	removeEvent( ev )

	// If the number of pointers down is less than two then reset diff tracker
	if ( evCache.length < 2 ) {
		prevDiff = -1
	}
}

const slideStart = ( e, container, marginLR ) => {
	const containerStyle = window.getComputedStyle( container )
	temp.durationStart = Date.now()
	temp.screenX = e.clientX
	temp.originalMarginLeft =
            +containerStyle[ marginLR ].slice( 0, -2 )
	temp.currentMarginLeft =
            +containerStyle[ marginLR ].slice( 0, -2 )
	temp.originalTransition = containerStyle.transition
	container.style.transition = 'unset'
}

const slideMove = ( e, container, marginLR, dir ) => {
	const clientX = e.clientX
	const offset = clientX - temp.screenX
	temp.currentMarginLeft = temp.originalMarginLeft + offset * ( dir === 'ltr' ? 1 : -1 )
	container.style[ marginLR ] = temp.currentMarginLeft + 'px'
	e.preventDefault()
}

const slideEnd = ( e, container, renderNext, marginLR, clientWidth, current ) => {
	const diff = temp.originalMarginLeft - temp.currentMarginLeft
	const duration = Date.now() - temp.durationStart
	if ( Math.abs( diff / clientWidth ) > 0.4 ||
    ( duration <= 300 && Math.abs( diff ) > 5 )
	) {
		renderNext( diff > 0 ? 1 : -1 )
		// TODO - reset image scale?
	} else {
		container.style[ marginLR ] = -clientWidth * current + 'px'
	}

}

export { temp, isInvalidEvent, isImgZoomedIn, getFingerAmount, zoomStart, zoomMove, zoomEnd, slideStart, slideMove, slideEnd }
