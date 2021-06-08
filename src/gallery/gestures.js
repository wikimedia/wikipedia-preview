const scaleMin = 1
const scaleMax = 2
const clientWidth = window.innerWidth
const clientHeight = window.innerHeight
const temp = {
	screenX: null,
	originalMarginLeft: null,
	currentMarginLeft: null,
	originalTransition: null,
	imgOriginalTransition: null,
	durationStart: null,
	translateX: 0,
	translateY: 0,
	clientX: null,
	clientY: null
}
let evCache = []
let prevDiff = -1
let zoomedIn = false

const grabImageFromEvent = ( ev ) => {
	return ev.target.nodeName === 'IMG' ? ev.target : ev.target.querySelector( 'img' )
}

const grabScaleFromTransform = ( transform ) => {
	return Number( transform.slice( transform.indexOf( 'scale' ) + 6, -1 ) )
}

const isInvalidEvent = ( e, items, current, captionText, prefixClassname ) => {
	return e.target.className === captionText &&
			items[ current ].querySelector( `.${prefixClassname}-item-caption-expand-cue` ) ||
			e.target.className === captionText ||
			e.pointerType !== 'touch' ||
			e.target.className.indexOf( 'slider-button' ) > -1
}

const isImgZoomedIn = () => {
	return zoomedIn
}

const getFingerAmount = () => {
	return evCache.length
}

const removeEvent = ( ev ) => {
	for ( let i = 0; i < evCache.length; i++ ) {
		if ( evCache[ i ].pointerId === ev.pointerId ) {
			evCache.splice( i, 1 )
			break
		}
	}
}

const clearZoom = ( image ) => {
	if ( image ) {
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
	}
}

const toggleZoom = ( ev ) => {
	const image = grabImageFromEvent( ev )
	temp.clientX = null
	temp.clientY = null
	temp.translateX = 0
	temp.translateY = 0
	if ( isImgZoomedIn() ) {
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
	} else {
		image.style.transform = `scale(${scaleMax})`
		zoomedIn = true
	}
}

const zoomStart = ( ev ) => {
	// The pointerdown event signals the start of a touch interaction.
	// This event is cached to support 2-finger gestures
	evCache.push( ev )
	const image = grabImageFromEvent( ev )
	const imageStyle = window.getComputedStyle( image )
	temp.imgOriginalTransition = imageStyle.transition
}

const zoomMove = ( ev ) => {
	const image = grabImageFromEvent( ev )
	const transform = image.style.transform
	// const imageWrapper = image.parentNode

	const delta = 0.1
	let scale = transform ? grabScaleFromTransform( transform ) : scaleMin

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
				if ( scale + delta < scaleMax ) {
					scale += delta
					image.style.transform = `scale(${scale})`
				}
			}
			if ( curDiff < prevDiff ) {
				// The distance between the two pointers has decreased
				// console.log( 'Pinch moving IN -> Zoom out', ev )
				// ev.target.style.border = '3px solid red'
				if ( scale - delta > scaleMin ) {
					scale -= delta
					image.style.transform = `scale(${scale})`
				} else {
					image.style.transform = `scale(${scaleMin})`
					zoomedIn = false
				}
			}
		}

		// Cache the distance for the next move event
		prevDiff = curDiff
	}
}

const zoomScroll = ( ev, renderNext, items, current ) => {
	const image = grabImageFromEvent( ev )
	const transform = image.style.transform
	const scale = transform ? grabScaleFromTransform( transform ) : scaleMin
	const horizontalLimit = clientWidth / 2
	const verticalLimit = clientHeight / 2
	const paddingOffset = 80

	image.style.transition = 'unset'
	if ( !temp.clientX || !temp.clientY ) {
		temp.clientX = ev.clientX
		temp.clientY = ev.clientY
	}

	const translateX = temp.translateX + ( ev.clientX - temp.clientX )
	const translateY = temp.translateY + ( ev.clientY - temp.clientY )

	if ( Math.abs( translateX ) < horizontalLimit && Math.abs( translateY ) < verticalLimit ) {
		temp.translateX = translateX
		temp.translateY = translateY
		temp.clientX = ev.clientX
		temp.clientY = ev.clientY
		image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`
	} else if ( Math.abs( translateX ) > horizontalLimit + paddingOffset ) {
		if ( translateX > 0 && items[ current - 1 ] ) {
			renderNext( -1 )
			clearZoom( image )
		} else if ( translateX < 0 && items[ current + 1 ] ) {
			renderNext( 1 )
			clearZoom( image )
		}
	}
}

const zoomEnd = ( ev ) => {
	removeEvent( ev )
	temp.clientX = null
	temp.clientY = null
	const image = grabImageFromEvent( ev )
	image.style.transition = temp.imgOriginalTransition
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

const slideEnd = ( e, container, renderNext, marginLR, current ) => {
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

export {
	temp, isInvalidEvent, isImgZoomedIn,
	getFingerAmount, toggleZoom, clearZoom,
	zoomStart, zoomMove, zoomScroll, zoomEnd,
	slideStart, slideMove, slideEnd
}
