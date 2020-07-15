let gallery = [],
	current = 0

const hideFullscreenGallery = () => {
		const fullscreenGallery = document.querySelector( '.wp-gallery-popup' )
		document.body.removeChild( fullscreenGallery )
	},

	renderNext = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = document.querySelector( '.wp-gallery-popup-caption' ),
			next = current + 1

		if ( gallery[ next ] ) {
			image.src = gallery[ next ].src
			caption.innerHTML = gallery[ next ].caption ? gallery[ next ].caption : ''
			current += 1
		}
	},

	renderPrevious = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = document.querySelector( '.wp-gallery-popup-caption' ),
			previous = current - 1

		if ( gallery[ previous ] ) {
			image.src = gallery[ previous ].src
			caption.innerHTML = gallery[ previous ].caption ? gallery[ previous ].caption : ''
			current -= 1
		}
	},

	showFullscreenGallery = ( event, mediaItems ) => {
		const fullscreenGallery = document.createElement( 'div' ),
			closeButton = document.createElement( 'div' ),
			nextButton = document.createElement( 'div' ),
			previousButton = document.createElement( 'div' ),
			imageContainer = document.createElement( 'div' ),
			image = document.createElement( 'img' ),
			caption = document.createElement( 'p' ),
			src = event.target.src

		gallery = mediaItems
		gallery.forEach( ( image, index ) => {
			if ( image.src === src ) {
				current = index
			}
		} )

		fullscreenGallery.classList.add( 'wp-gallery-popup' )

		image.src = src
		imageContainer.appendChild( image )
		imageContainer.classList.add( 'wp-gallery-popup-image' )

		caption.innerHTML = gallery[ current ].caption ? gallery[ current ].caption : ''
		caption.classList.add( 'wp-gallery-popup-caption' )

		closeButton.classList.add( 'wp-gallery-popup-button', 'close' )
		closeButton.addEventListener( 'click', hideFullscreenGallery )
		nextButton.classList.add( 'wp-gallery-popup-button', 'next' )
		nextButton.addEventListener( 'click', renderNext )
		previousButton.classList.add( 'wp-gallery-popup-button', 'previous' )
		previousButton.addEventListener( 'click', renderPrevious )

		Array.prototype.forEach.call(
			[ closeButton, nextButton, previousButton, imageContainer, caption ],
			element => {
				fullscreenGallery.appendChild( element )
			}
		)

		document.body.appendChild( fullscreenGallery )

	},

	getGalleryRow = ( mediaItems ) => {
		let galleryRow = ''
		mediaItems.forEach( item => {
			galleryRow += `<img class="wikipediapreview-gallery-image" src=${item.src}>`
		} )
		return galleryRow
	}

export { getGalleryRow, showFullscreenGallery }
