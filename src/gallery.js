let gallery = [],
	current = 0

const getLoadingContainer = ( doc ) => {
		const component = doc.createElement( 'div' ),
			iconContainer = doc.createElement( 'div' ),
			textContainer = doc.createElement( 'div' ),
			spinnerContainer = doc.createElement( 'div' ),
			spinner = doc.createElement( 'div' ),
			bounceBegin = doc.createElement( 'div' ),
			bounceEnd = doc.createElement( 'div' ),
			error = doc.createElement( 'div' )

		component.classList.add( 'wp-gallery-popup-loading' )
		spinnerContainer.classList.add( 'wp-gallery-popup-loading-spinner-container' )
		spinner.classList.add( 'wp-gallery-popup-loading-spinner' )
		bounceBegin.classList.add( 'wp-gallery-popup-loading-bounce' )
		bounceEnd.classList.add( 'wp-gallery-popup-loading-bounce' )
		iconContainer.classList.add( 'wp-gallery-popup-loading-icons' )
		textContainer.classList.add( 'wp-gallery-popup-loading-text' )
		error.classList.add( 'wp-gallery-popup-loading-error' )

		spinner.appendChild( bounceBegin )
		spinner.appendChild( bounceEnd )
		spinnerContainer.appendChild( spinner )
		iconContainer.appendChild( spinnerContainer )
		iconContainer.appendChild( error )
		component.appendChild( iconContainer )
		component.appendChild( textContainer )

		return component
	},

	toggleLoading = ( loading, image ) => {
		const text = loading.querySelector( '.wp-gallery-popup-loading-text' ),
			error = loading.querySelector( '.wp-gallery-popup-loading-error' ),
			spinner = loading.querySelector( '.wp-gallery-popup-loading-spinner-container' ),

			timeoutId = setTimeout( () => {
				text.innerHTML = 'Still loading'
				text.style.visibility = 'visible'
			}, 5000 ),

			onLoad = () => {
				clearTimeout( timeoutId )
				loading.style.visibility = 'hidden'
				text.style.visibility = 'hidden'
				image.style.visibility = 'visible'
				image.removeEventListener( 'load', onLoad )
			},

			onError = () => {
				clearTimeout( timeoutId )
				error.style.visibility = 'visible'
				spinner.style.visibility = 'hidden'
				text.innerHTML = 'There was an error loading this image'
				text.style[ 'font-size' ] = '16px'
				text.style.visibility = 'visible'
				image.removeEventListener( 'error', onError )
			}

		image.style.visibility = 'hidden'
		loading.style.visibility = 'visible'
		text.style.visibility = 'hidden'
		error.style.visibility = 'hidden'

		image.addEventListener( 'load', onLoad )
		image.addEventListener( 'error', onError )
	},

	hideFullscreenGallery = ( galleryContainer ) => {
		const fullscreenGallery = galleryContainer.querySelector( '.wp-gallery-popup' )
		galleryContainer.removeChild( fullscreenGallery )
	},

	renderNext = ( galleryContainer ) => {
		const image = galleryContainer.querySelector( '.wp-gallery-popup-image' ).firstChild,
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			nextButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previousButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			next = current + 1,
			loading = galleryContainer.querySelector( '.wp-gallery-popup-loading' )

		if ( gallery[ next ] ) {
			toggleLoading( loading, image )
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
			previous = current - 1,
			loading = galleryContainer.querySelector( '.wp-gallery-popup-loading' )

		if ( gallery[ previous ] ) {
			toggleLoading( loading, image )
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
			loading = getLoadingContainer( doc ),
			selected = event.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' ),
			galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' )

		gallery = mediaItems
		gallery.forEach( ( image, index ) => {
			if ( image.thumb === selected ) {
				current = index
			}
		} )
		toggleLoading( loading, image )

		fullscreenGallery.classList.add( 'wp-gallery-popup' )
		top.classList.add( 'wp-gallery-popup-top' )
		main.classList.add( 'wp-gallery-popup-main' )
		bottom.classList.add( 'wp-gallery-popup-bottom' )

		image.src = gallery[ current ].src
		imageContainer.appendChild( image )
		imageContainer.appendChild( loading )
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
