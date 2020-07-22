let gallery = [],
	current = 0

const hideFullscreenGallery = ( doc = document ) => {
		const fullscreenGallery = doc.querySelector( '.wp-gallery-popup' )
		doc.body.removeChild( fullscreenGallery )
	},

	renderNext = ( doc = document ) => {
		const image = doc.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = doc.querySelector( '.wp-gallery-popup-caption' ),
			nextButton = doc.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previousButton = doc.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			next = current + 1

		if ( gallery[ next ] ) {
			image.src = gallery[ next ].src
			caption.innerHTML = gallery[ next ].caption ? gallery[ next ].caption : ''
			nextButton.style.opacity = gallery[ next + 1 ] ? '1' : '0.5'
			previousButton.style.opacity = current === 0 ? '1' : null
			current += 1
		}
	},

	renderPrevious = ( doc = document ) => {
		const image = doc.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = doc.querySelector( '.wp-gallery-popup-caption' ),
			previousButton = doc.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			nextButton = doc.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previous = current - 1

		if ( gallery[ previous ] ) {
			image.src = gallery[ previous ].src
			caption.innerHTML = gallery[ previous ].caption ? gallery[ previous ].caption : ''
			previousButton.style.opacity = gallery[ previous - 1 ] ? '1' : '0.5'
			nextButton.style.opacity = current === gallery.leght - 1 ? '1' : null
			current -= 1
		}
	},

	showFullscreenGallery = ( event, mediaItems, doc = document ) => {
		const fullscreenGallery = doc.createElement( 'div' ),
			closeButton = doc.createElement( 'div' ),
			nextButton = doc.createElement( 'div' ),
			previousButton = doc.createElement( 'div' ),
			imageContainer = doc.createElement( 'div' ),
			image = doc.createElement( 'img' ),
			caption = doc.createElement( 'p' ),
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
		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( doc )
		} )
		nextButton.classList.add( 'wp-gallery-popup-button', 'next' )
		nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
		nextButton.addEventListener( 'click', () => {
			renderNext( doc )
		} )
		previousButton.classList.add( 'wp-gallery-popup-button', 'previous' )
		previousButton.style.opacity = current === 0 ? '0.5' : '1'
		previousButton.addEventListener( 'click', () => {
			renderPrevious( doc )
		} )

		Array.prototype.forEach.call(
			[ previousButton, nextButton ],
			element => {
				imageContainer.appendChild( element )
			}
		)

		Array.prototype.forEach.call(
			[ closeButton, imageContainer, caption ],
			element => {
				fullscreenGallery.appendChild( element )
			}
		)

		doc.body.appendChild( fullscreenGallery )

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
