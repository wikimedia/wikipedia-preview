let gallery = [],
	current = 0

const hideFullscreenGallery = () => {
		const fullscreenGallery = document.querySelector( '.wp-gallery-popup' )
		document.body.removeChild( fullscreenGallery )
	},

	renderNext = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = document.querySelector( '.wp-gallery-popup-caption' ),
			nextButton = document.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previousButton = document.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			next = current + 1

		if ( gallery[ next ] ) {
			image.src = gallery[ next ].src
			caption.innerHTML = gallery[ next ].caption ? gallery[ next ].caption : ''
			nextButton.style.opacity = gallery[ next + 1 ] ? '1' : '0.5'
			previousButton.style.opacity = current === 0 ? '1' : null
			current += 1
		}
	},

	renderPrevious = () => {
		const image = document.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = document.querySelector( '.wp-gallery-popup-caption' ),
			previousButton = document.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			nextButton = document.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previous = current - 1

		if ( gallery[ previous ] ) {
			image.src = gallery[ previous ].src
			caption.innerHTML = gallery[ previous ].caption ? gallery[ previous ].caption : ''
			previousButton.style.opacity = gallery[ previous - 1 ] ? '1' : '0.5'
			nextButton.style.opacity = current === gallery.leght - 1 ? '1' : null
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
			src = event.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )

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
		nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
		nextButton.addEventListener( 'click', renderNext )
		previousButton.classList.add( 'wp-gallery-popup-button', 'previous' )
		previousButton.style.opacity = current === 0 ? '0.5' : '1'
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
		const galleryRow = document.createElement( 'div' )
		galleryRow.classList.add( 'wikipediapreview-gallery-row' )

		mediaItems.forEach( item => {
			const image = document.createElement( 'div' )

			image.classList.add( 'wikipediapreview-gallery-image' )
			image.style.backgroundImage = `url(${item.src})`
			image.addEventListener( 'click', ( e ) => {
				showFullscreenGallery( e, mediaItems )
			} )

			galleryRow.appendChild( image )
		} )

		return galleryRow
	}

export { getGalleryRow, showFullscreenGallery }
