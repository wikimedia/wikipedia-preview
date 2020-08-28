let current = 0
const clientWidth = window.innerWidth,
	prefixClassname = 'wp-gallery-fullscreen-slider',
	renderImageSlider = ( images = [], selectedImage = '' ) => {
        const selectedIndex = images.findIndex( image => image.thumb === selectedImage ), // eslint-disable-line
			imageListHtml = images.map( ( image ) => `
                <div class="${prefixClassname}-item">
                    <img src="${image.src}" loading="lazy"/>
                </div>
                `.trim()
			).join( '' )

		current += selectedIndex
		return `
            <div class="${prefixClassname}" style="margin-left:-${selectedIndex * clientWidth}px">
                <div class="${prefixClassname}-button previous"></div>
                <div class="${prefixClassname}-button next"></div>
                ${imageListHtml}
            </div>
        `.trim()
	},
	renderNext = ( offset = 1 ) => {
		// @todo RTL Support
		const slider = document.querySelector( `.${prefixClassname}` ),
			items = slider.querySelectorAll( `.${prefixClassname}-item` ),
			nextButton = slider.querySelector( '.next' ),
			previousButton = slider.querySelector( '.previous' ),
			next = current + offset

		if ( items[ next ] ) {
			current += offset
			nextButton.style.opacity = current === items.length - 1 ? '0.5' : '1'
			previousButton.style.opacity = current === 0 ? '0.5' : '1'
		}

		slider.style.marginLeft = -clientWidth * current + 'px'

		/* original source
        const image = galleryContainer.querySelector( 'img' ),
			caption = galleryContainer.querySelector( '.wp-gallery-fullscreen-caption' ),
			nextButton = galleryContainer.querySelector( '.next' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			next = current + offset,
			loading = galleryContainer.querySelector( '.wp-gallery-fullscreen-loading' )

		if ( gallery[ next ] ) {
			toggleLoading( loading, image, lang )
			image.src = gallery[ next ].src
			caption.innerText = gallery[ next ].caption ? gallery[ next ].caption : ''
        }
        */
	},

	renderPrevious = () => {
		renderNext( -1 )
	},
	applyGestureEvent = () => {
		let temp = {
			screenX: null,
			targetScreenX: null,
			originalMarginLeft: null,
			currentMarginLeft: null,
			originalTransition: null
		}

		const container = document.querySelector( `.${prefixClassname}` )

		container.addEventListener( 'touchstart', e => {
			temp.screenX = e.touches[ 0 ].clientX
			temp.targetScreenX = null
			temp.originalMarginLeft =
                +window.getComputedStyle( container ).marginLeft.slice( 0, -2 )
			temp.currentMarginLeft =
                +window.getComputedStyle( container ).marginLeft.slice( 0, -2 )
			temp.originalTransition = window.getComputedStyle( container ).transition
			container.style.transition = 'unset'
		} )
		container.addEventListener( 'touchmove', e => {
			const clientX = e.touches[ 0 ].clientX,
				offset = clientX - temp.screenX
			temp.targetScreenX = clientX
			temp.currentMarginLeft = temp.originalMarginLeft + offset
			container.style.marginLeft = temp.currentMarginLeft + 'px'
		} )
		container.addEventListener( 'touchend', () => {
			container.style.transition = temp.originalTransition
			const diff = temp.originalMarginLeft - temp.currentMarginLeft

			if ( Math.abs( diff / clientWidth ) > 0.4 ) {
				renderNext( diff > 0 ? 1 : -1 )
			} else {
				container.style.marginLeft = temp.originalMarginLeft + 'px'
			}
		} )
	},
	onShowFn = () => {
		const sliderContainer = document.querySelector( `.${prefixClassname}` ),
			items = sliderContainer.querySelectorAll( `.${prefixClassname}-item` ),
			nextButton = sliderContainer.querySelector( '.next' ),
			previousButton = sliderContainer.querySelector( '.previous' )

		renderNext( current )
		applyGestureEvent()
		if ( items.length === 1 ) {
			previousButton.style.visibility = 'hidden'
			nextButton.style.visibility = 'hidden'
		} else {
			nextButton.addEventListener( 'click', () => {
				renderNext()
			} )
			previousButton.addEventListener( 'click', () => {
				renderPrevious()
			} )
		}
	}

export { renderImageSlider, onShowFn }
