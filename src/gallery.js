let gallery = [],
	current = 0

const hideFullscreenGallery = ( galleryContainer ) => {
		const fullscreenGallery = galleryContainer.querySelector( '.wp-gallery-popup' )
		galleryContainer.removeChild( fullscreenGallery )
	},

	renderNext = ( galleryContainer ) => {
		const image = galleryContainer.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			nextButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previousButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			next = current + 1

		if ( gallery[ next ] ) {
			image.src = gallery[ next ].src
			caption.innerHTML = gallery[ next ].caption ? gallery[ next ].caption : ''
			nextButton.style.opacity = gallery[ next + 1 ] ? '1' : '0.5'
			previousButton.style.opacity = current === 0 ? '1' : null
			current += 1
		}
	},

	renderPrevious = ( galleryContainer ) => {
		const image = galleryContainer.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			previousButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			nextButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previous = current - 1

		if ( gallery[ previous ] ) {
			image.src = gallery[ previous ].src
			caption.innerHTML = gallery[ previous ].caption ? gallery[ previous ].caption : ''
			previousButton.style.opacity = gallery[ previous - 1 ] ? '1' : '0.5'
			nextButton.style.opacity = current === gallery.leght - 1 ? '1' : null
			current -= 1
		}
	},

	showFullscreenGallery = ( event, mediaItems, popup, doc = document ) => {
		const fullscreenGallery = doc.createElement( 'div' ),
			top = doc.createElement( 'div' ),
			main = doc.createElement( 'div' ),
			bottom = doc.createElement( 'div' ),
			closeButton = doc.createElement( 'div' ),
			nextButton = doc.createElement( 'div' ),
			previousButton = doc.createElement( 'div' ),
			imageContainer = doc.createElement( 'div' ),
			image = doc.createElement( 'img' ),
			caption = doc.createElement( 'div' ),
			selected = event.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' ),
			galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' )

		gallery = mediaItems
		gallery.forEach( ( image, index ) => {
			if ( image.thumb === selected ) {
				current = index
			}
		} )

		fullscreenGallery.classList.add( 'wp-gallery-popup' )
		top.classList.add( 'wp-gallery-popup-top' )
		main.classList.add( 'wp-gallery-popup-main' )
		bottom.classList.add( 'wp-gallery-popup-bottom' )

		image.src = gallery[ current ].src
		imageContainer.appendChild( image )
		imageContainer.classList.add( 'wp-gallery-popup-image' )

		caption.innerHTML = gallery[ current ].caption ? gallery[ current ].caption : ''
		caption.classList.add( 'wp-gallery-popup-caption' )
		bottom.appendChild( caption )

		closeButton.classList.add( 'wp-gallery-popup-button', 'close' )
		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( galleryContainer )
		} )
		top.appendChild( closeButton )

		nextButton.classList.add( 'wp-gallery-popup-button', 'next' )
		nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
		nextButton.addEventListener( 'click', () => {
			renderNext( galleryContainer )
		} )
		previousButton.classList.add( 'wp-gallery-popup-button', 'previous' )
		previousButton.style.opacity = current === 0 ? '0.5' : '1'
		previousButton.addEventListener( 'click', () => {
			renderPrevious( galleryContainer )
		} )

		if ( gallery.length > 1 ) {
			[ previousButton, imageContainer, nextButton ].forEach( element => {
				main.appendChild( element )
			} )
		} else {
			main.appendChild( imageContainer )
		}

		[ top, main, bottom ].forEach( element => {
			fullscreenGallery.appendChild( element )
		} )

		galleryContainer.appendChild( fullscreenGallery )

	},

	getGalleryRow = ( mediaItems, popup ) => {
		const galleryRow = document.createElement( 'div' )
		galleryRow.classList.add( 'wikipediapreview-gallery-row' )

		mediaItems.forEach( item => {
			const image = document.createElement( 'div' )

			image.classList.add( 'wikipediapreview-gallery-image' )
			image.style.backgroundImage = `url(${item.thumb})`
			image.addEventListener( 'click', ( e ) => {
				showFullscreenGallery( e, mediaItems, popup )
			} )

			galleryRow.appendChild( image )
		} )

		return galleryRow
	}

export { getGalleryRow, showFullscreenGallery }
