let gallery = [],
	current = 0

const hideFullscreenGallery = () => {
		const fullscreenGallery = document.querySelector( '.wp-gallery-popup' )
		// @todo - remove event listeners?
		document.body.removeChild( fullscreenGallery )
	},

	renderNext = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild
		if ( gallery[ current + 1 ] ) {
			image.src = gallery[ current + 1 ].src
			current += 1
		}

	},

	renderPrevious = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild
		if ( gallery[ current - 1 ] ) {
			image.src = gallery[ current - 1 ].src
			current -= 1
		}

	},

	showFullscreenGallery = ( target, mediaItems ) => {
		const fullscreenGallery = document.createElement( 'div' ),
			closeButton = document.createElement( 'div' ),
			nextButton = document.createElement( 'div' ),
			previousButton = document.createElement( 'div' ),
			imageContainer = document.createElement( 'div' ),
			image = document.createElement( 'img' ),
			src = target.originalTarget.src

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

		closeButton.classList.add( 'wp-gallery-popup-closebtn' )
		closeButton.addEventListener( 'click', hideFullscreenGallery )
		nextButton.classList.add( 'wp-gallery-popup-nextbtn' )
		nextButton.addEventListener( 'click', renderNext )
		previousButton.classList.add( 'wp-gallery-popup-previousbtn' )
		previousButton.addEventListener( 'click', renderPrevious )

		Array.prototype.forEach.call(
			[ closeButton, nextButton, previousButton, imageContainer ],
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
