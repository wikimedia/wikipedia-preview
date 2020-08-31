import { msg } from '../i18n'

// internal state of the slider component
let current = 0,
	dir = ''

const clientWidth = window.innerWidth,
	prefixClassname = 'wp-gallery-fullscreen-slider',
	renderImageSlider = ( images = [], selectedImage = '', lang, givenDir ) => {
        const selectedIndex = images.findIndex( image => image.thumb === selectedImage ), // eslint-disable-line
			imageListHtml = images.map( ( image ) => `
                <div class="${prefixClassname}-item">
                    <div class="${prefixClassname}-item-loading">
                        <div class="${prefixClassname}-item-loading-spinner">
                            <div class="${prefixClassname}-item-loading-spinner-animation">
                                <div class="${prefixClassname}-item-loading-spinner-animation-bounce"></div>
                            </div>
                        </div>
                        <div class="${prefixClassname}-item-loading-text">${msg( lang, 'gallery-loading-still' )}</div>
                    </div>
                    <div class="${prefixClassname}-item-loading-error">
                            <div class="${prefixClassname}-item-loading-error-text">${msg( lang, 'gallery-loading-error' )}</div>
                            <div class="${prefixClassname}-item-loading-error-refresh">${msg( lang, 'gallery-loading-error-refresh' )}</div>
                        </div>
                    <img src="${image.src}" loading="lazy"/>
                </div>
                `.trim()
			).join( '' )

		// set the internal state
		current = selectedIndex
		dir = givenDir

		return `
            <div class="${prefixClassname}" style="${dir === 'ltr' ? 'margin-left' : 'margin-right'}:-${selectedIndex * clientWidth}px">
                <div class="${prefixClassname}-button previous"></div>
                <div class="${prefixClassname}-button next"></div>
                ${imageListHtml}
            </div>
        `.trim()
	},
	renderNext = ( offset = 1 ) => {
		const slider = document.querySelector( `.${prefixClassname}` ),
			items = slider.querySelectorAll( `.${prefixClassname}-item` ),
			nextButton = slider.querySelector( '.next' ),
			previousButton = slider.querySelector( '.previous' ),
			next = current + offset,
			item = items[ next ]

		if ( item ) {
			current += offset
			nextButton.style.opacity = current === items.length - 1 ? '0.5' : '1'
			previousButton.style.opacity = current === 0 ? '0.5' : '1'

			const imageElement = item.querySelector( 'img' )
			if ( imageElement.complete ) {
				const loading = item.querySelector( `.${prefixClassname}-item-loading` )
				loading.style.visibility = 'hidden'
			} else {
				const textElement = item.querySelector( `.${prefixClassname}-item-loading-text` ),
					errorElement = item.querySelector( `.${prefixClassname}-item-loading-error` ),
					timeoutId = setTimeout( () => {
						textElement.style.visibility = 'visible'
					}, 5000 )

				imageElement.addEventListener( 'load', () => {
					const loading = item.querySelector( `.${prefixClassname}-item-loading` )
					loading.style.visibility = 'hidden'
					clearTimeout( timeoutId )
				} )

				imageElement.addEventListener( 'error', () => {
					const loading = item.querySelector( `.${prefixClassname}-item-loading` ),
						refreshElement = item.querySelector( `.${prefixClassname}-item-loading-error-refresh` )
					loading.style.visibility = 'hidden'
					errorElement.style.visibility = 'visible'
					clearTimeout( timeoutId )

					// @todo action to refresh the current image
					refreshElement.addEventListener( 'click', () => { } )
				} )

			}
		}

		slider.style[ dir === 'ltr' ? 'marginLeft' : 'marginRight' ] = -clientWidth * current + 'px'

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

		const container = document.querySelector( `.${prefixClassname}` ),
			marginLR = dir === 'ltr' ? 'marginLeft' : 'marginRight'

		container.addEventListener( 'touchstart', e => {
			temp.screenX = e.touches[ 0 ].clientX
			temp.targetScreenX = null
			temp.originalMarginLeft =
                +window.getComputedStyle( container )[ marginLR ].slice( 0, -2 )
			temp.currentMarginLeft =
                +window.getComputedStyle( container )[ marginLR ].slice( 0, -2 )
			temp.originalTransition = window.getComputedStyle( container ).transition
			container.style.transition = 'unset'
		} )
		container.addEventListener( 'touchmove', e => {
			const clientX = e.touches[ 0 ].clientX,
				offset = clientX - temp.screenX
			temp.targetScreenX = clientX
			temp.currentMarginLeft = temp.originalMarginLeft + offset * ( dir === 'ltr' ? 1 : -1 )
			container.style[ marginLR ] = temp.currentMarginLeft + 'px'
		} )
		container.addEventListener( 'touchend', () => {
			container.style.transition = temp.originalTransition
			const diff = temp.originalMarginLeft - temp.currentMarginLeft

			if ( Math.abs( diff / clientWidth ) > 0.4 ) {
				renderNext( diff > 0 ? 1 : -1 )
			} else {
				container.style[ marginLR ] = temp.originalMarginLeft + 'px'
			}
		} )
	},
	onShowFn = () => {
		const sliderContainer = document.querySelector( `.${prefixClassname}` ),
			items = sliderContainer.querySelectorAll( `.${prefixClassname}-item` ),
			nextButton = sliderContainer.querySelector( '.next' ),
			previousButton = sliderContainer.querySelector( '.previous' )

		renderNext( 0 )
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
