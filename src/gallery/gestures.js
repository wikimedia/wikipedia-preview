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
	clientY: null,
	imageRect: {}
}
let evCache = []
let prevDiff = -1
let zoomedIn = false

const grabImageFromEvent = ( e ) => {
	return e.target.nodeName === 'IMG' ? e.target : e.target.querySelector( 'img' )
}

const grabScaleFromTransform = ( transform ) => {
	return transform ?
		Number( transform.slice( transform.indexOf( 'scale' ) + 6, -1 ) ) :
		scaleMin
}

const grabTranslateFromTransform = ( transform ) => {
	const re = /translate3d\((?<x>.*?)px, (?<y>.*?)px, (?<z>.*?)px/
	const coordinates = re.exec( transform )
	return coordinates ?
		`translate3d(${coordinates.groups.x}px, ${coordinates.groups.y}px, ${0}px)` :
		`translate3d(${temp.translateX}px, ${temp.translateY}px, ${0}px)`
}

const isInvalidEvent = ( e, prefixClassname ) => {
	const invalidClasses = [
		`${prefixClassname}-item-caption`,
		`${prefixClassname}-item-caption-expand-cue`,
		`${prefixClassname}-item-caption-text`,
		`${prefixClassname}-item-attribution`,
		`${prefixClassname}-button`
	]

	const invalidElement = invalidClasses.find( className => {
		return e.target.className.indexOf( className ) > -1
	} )

	return e.pointerType !== 'touch' || invalidElement
}

const isImgZoomedIn = () => {
	return zoomedIn
}

const isImgLandscape = ( image ) => {
	return image.naturalHeight <= image.naturalWidth
}

const isImgSmallerThanViewport = ( image ) => {
	const buffer = 50
	return image.naturalWidth + buffer < clientWidth
}

const getFingerAmount = () => {
	return evCache.length
}

const getTransformOrigin = ( e = null, image ) => {
	let coordinates = {}
	const setBestVertical = () => {
		if ( e.clientY > image.naturalHeight && !isImgLandscape( image ) ) {
			return image.naturalHeight
		}
		return e.clientY
	}
	if ( evCache.length === 2 ) {
		coordinates.x = ( evCache[ 0 ].clientX + evCache[ 1 ].clientX ) / 2
		coordinates.y = ( evCache[ 0 ].clientY + evCache[ 1 ].clientY ) / 2
	} else {
		coordinates.x = e.clientX
		coordinates.y = setBestVertical()
	}
	return coordinates
}

const setTransformOrigin = ( image, e ) => {
	const currentTransformOrigin = getTransformOrigin( e, image )
	if ( isImgLandscape( image ) ) {
		currentTransformOrigin.y = currentTransformOrigin.y - image.naturalHeight
	} else if ( isImgSmallerThanViewport( image ) ) {
		currentTransformOrigin.x = image.naturalWidth / 2
		currentTransformOrigin.y = image.naturalHeight / 2
	}
	return `${currentTransformOrigin.x}px ${currentTransformOrigin.y}px`
}

const removeEvent = ( e ) => {
	for ( let i = 0; i < evCache.length; i++ ) {
		if ( evCache[ i ].pointerId === e.pointerId ) {
			evCache.splice( i, 1 )
			break
		}
	}
}

const clearZoom = ( image ) => {
	if ( image ) {
		image.style.transition = temp.imgOriginalTransition
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
		temp.translateX = 0
		temp.translateY = 0
	}
}

const toggleZoom = ( e ) => {
	const image = grabImageFromEvent( e )
	temp.clientX = null
	temp.clientY = null
	temp.translateX = 0
	temp.translateY = 0
	image.style.transformOrigin = setTransformOrigin( image, e )

	if ( isImgZoomedIn() ) {
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
	} else {
		image.style.transform = `scale(${scaleMax})`
		zoomedIn = true
	}
}

const zoomStart = ( e ) => {
	const image = grabImageFromEvent( e )

	if ( !image ) {
		return
	}

	const imageRect = image.getBoundingClientRect()
	temp.imageRect.top = imageRect.top
	temp.imageRect.bottom = imageRect.bottom
	temp.imageRect.left = imageRect.left
	temp.imageRect.right = imageRect.right

	if ( evCache.length < 1 ) {
		const imageStyle = window.getComputedStyle( image )
		temp.imgOriginalTransition = imageStyle.transition
	}
	evCache.push( e )
}

const zoomMove = ( e ) => {
	const image = grabImageFromEvent( e )
	const transform = image.style.transform
	const delta = 0.01
	const buffer = 0.4
	let scale = grabScaleFromTransform( transform )
	const translate3d = grabTranslateFromTransform( transform )

	for ( let i = 0; i < evCache.length; i++ ) {
		if ( e.pointerId === evCache[ i ].pointerId ) {
			evCache[ i ] = e
			break
		}
	}

	if ( evCache.length === 2 ) {
		const deltaX = Math.abs( evCache[ 0 ].clientX - evCache[ 1 ].clientX )
		const deltaY = Math.abs( evCache[ 0 ].clientY - evCache[ 1 ].clientY )
		const curDiff = Math.sqrt( Math.pow( deltaX, 2 ) + Math.pow( deltaY, 2 ) )

		if ( prevDiff > 0 ) {
			image.style.transformOrigin = setTransformOrigin( image )
			image.style.transition = 'unset'
			if ( curDiff > prevDiff ) {
				zoomedIn = true
				if ( scale + delta < scaleMax ) {
					// Expand image
					scale += delta
					image.style.transform = `${translate3d} scale(${scale})`
				}
			}
			if ( curDiff < prevDiff ) {
				if ( scale - delta > scaleMin + buffer ) {
					// Contract image
					scale -= delta
					image.style.transform = `${translate3d} scale(${scale})`
				} else {
					clearZoom( image )
				}
			}
		}

		prevDiff = curDiff
	}
}

const zoomScroll = ( e, renderNext, items, current, dir ) => {
	const image = grabImageFromEvent( e )

	if ( !image ) {
		return
	}

	const transform = image.style.transform
	const scale = grabScaleFromTransform( transform )
	const leftLimit = clientWidth / 8
	const rightLimit = clientWidth - leftLimit
	const topLimit = isImgLandscape( image ) ? clientHeight / 4 : clientHeight / 8
	const bottomLimit = clientHeight - topLimit
	const offset = 80

	image.style.transition = 'unset'
	if ( !temp.clientX || !temp.clientY ) {
		temp.clientX = e.clientX
		temp.clientY = e.clientY
	}

	const translateX = temp.translateX + ( e.clientX - temp.clientX )
	const translateY = temp.translateY + ( e.clientY - temp.clientY )
	const scrollingUp = translateY - temp.translateY >= 0
	const scrollingLeft = translateX - temp.translateX >= 0

	const isImageWithinBoundaries = () => {
		const horizontallyBound = temp.imageRect.left < leftLimit && scrollingLeft ||
			temp.imageRect.right > rightLimit && !scrollingLeft
		const verticallyBound = temp.imageRect.top < topLimit && scrollingUp ||
			temp.imageRect.bottom > bottomLimit && !scrollingUp

		return horizontallyBound && verticallyBound
	}
	const updateTempValues = () => {
		// The order matters: update imageRect first
		temp.imageRect.top = temp.imageRect.top + ( translateY - temp.translateY )
		temp.imageRect.bottom = temp.imageRect.bottom + ( translateY - temp.translateY )
		temp.imageRect.left = temp.imageRect.left + ( translateX - temp.translateX )
		temp.imageRect.right = temp.imageRect.right + ( translateX - temp.translateX )
		temp.translateX = translateX
		temp.translateY = translateY
		temp.clientX = e.clientX
		temp.clientY = e.clientY
	}
	const slideToNextOrPrevious = Math.abs( translateX ) - Math.abs( temp.translateX ) > offset

	if ( isImageWithinBoundaries() ) {
		updateTempValues()
		image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`
	} else if ( slideToNextOrPrevious ) {
		const next = ( dir === 'ltr' && translateX < 0 ) || ( dir === 'rtl' && translateX > 0 )
		if ( !next && items[ current - 1 ] ) {
			renderNext( -1 )
		} else if ( next && items[ current + 1 ] ) {
			renderNext( 1 )
		}
	}
}

const zoomEnd = ( e ) => {
	const image = grabImageFromEvent( e )
	if ( image ) {
		image.style.transition = temp.imgOriginalTransition
	}
	removeEvent( e )
	temp.clientX = null
	temp.clientY = null
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
