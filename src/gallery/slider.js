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
			slider.style.marginLeft = -clientWidth * current + 'px'
			nextButton.style.opacity = current === items.length - 1 ? '0.5' : '1'
			previousButton.style.opacity = current === 0 ? '0.5' : '1'
		}

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
	onShowFn = () => {
		const sliderContainer = document.querySelector( `.${prefixClassname}` ),
			items = sliderContainer.querySelectorAll( `.${prefixClassname}-item` ),
			nextButton = sliderContainer.querySelector( '.next' ),
			previousButton = sliderContainer.querySelector( '.previous' )

		renderNext( current )
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
