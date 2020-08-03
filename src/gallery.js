let gallery = [],
	current = 0

const getFullScreenGallery = () => {
		return `
			<div class="wp-gallery-popup">
				<div class="wp-gallery-popup-top">
					<div class="wp-gallery-popup-button close"></div>
				</div>
				<div class="wp-gallery-popup-main">
					<div class="wp-gallery-popup-button previous"></div>
					<div class="wp-gallery-popup-image">
						<img src="">
						<div class="wp-gallery-popup-loading">
							<div class="wp-gallery-popup-loading-icons">
								<div class="wp-gallery-popup-loading-spinner-container">
									<div class="wp-gallery-popup-loading-spinner">
										<div class="wp-gallery-popup-loading-bounce"></div>
										<div class="wp-gallery-popup-loading-bounce"></div>
									</div>
								</div>
								<div class="wp-gallery-popup-loading-error"></div>
							</div>
							<div class="wp-gallery-popup-loading-text"></div>
							<div class="wp-gallery-popup-loading-error-refresh"></div>
						</div>
					</div>
					<div class="wp-gallery-popup-button next"></div>
				</div>
				<div class="wp-gallery-popup-bottom">
					<div class="wp-gallery-popup-caption"></div>
				</div>
			</div>
		`.trim()
	},

	toggleLoading = ( loading, image ) => {
		const text = loading.querySelector( '.wp-gallery-popup-loading-text' ),
			error = loading.querySelector( '.wp-gallery-popup-loading-error' ),
			refresh = loading.querySelector( '.wp-gallery-popup-loading-error-refresh' ),
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

			onRefresh = () => {
				toggleLoading( loading, image )
				image.src = gallery[ current ].src
				refresh.removeEventListener( 'click', onRefresh )
			},

			onError = () => {
				clearTimeout( timeoutId )
				error.style.visibility = 'visible'
				spinner.style.visibility = 'hidden'
				text.innerHTML = 'There was an error loading this image'
				text.style[ 'font-size' ] = '16px'
				text.style.visibility = 'visible'
				refresh.innerHTML = 'Refresh'
				refresh.style.visibility = 'visible'
				refresh.addEventListener( 'click', onRefresh )
				image.removeEventListener( 'error', onError )
			}

		loading.style.visibility = 'visible'
		image.style.visibility = 'hidden'
		text.style.visibility = 'hidden'
		error.style.visibility = 'hidden'
		refresh.style.visibility = 'hidden'

		image.addEventListener( 'load', onLoad )
		image.addEventListener( 'error', onError )
	},

	hideFullscreenGallery = ( galleryContainer ) => {
		const fullscreenGallery = galleryContainer.querySelector( '.wp-gallery-popup' )
		galleryContainer.removeChild( fullscreenGallery )
	},

	renderNext = ( galleryContainer ) => {
		const image = galleryContainer.querySelector( 'img' ),
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
		const image = galleryContainer.querySelector( 'img' ),
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

	showFullscreenGallery = ( event, mediaItems, popup ) => {
		const fullscreenGallery = getFullScreenGallery(),
			selected = event.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' ),
			galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' )

		gallery = mediaItems
		gallery.forEach( ( image, index ) => {
			if ( image.thumb === selected ) {
				current = index
			}
		} )

		galleryContainer.insertAdjacentHTML( 'beforeend', fullscreenGallery )

		let image = galleryContainer.querySelector( 'img' ),
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			loading = galleryContainer.querySelector( '.wp-gallery-popup-loading' ),
			nextButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.next' )[ 0 ],
			previousButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.previous' )[ 0 ],
			closeButton = galleryContainer.querySelectorAll( '.wp-gallery-popup-button.close' )[ 0 ]

		toggleLoading( loading, image )

		image.src = gallery[ current ].src

		caption.innerHTML = gallery[ current ].caption ? gallery[ current ].caption : ''

		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( galleryContainer )
		} )

		nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
		nextButton.addEventListener( 'click', () => {
			renderNext( galleryContainer )
		} )

		previousButton.style.opacity = current === 0 ? '0.5' : '1'
		previousButton.addEventListener( 'click', () => {
			renderPrevious( galleryContainer )
		} )

		if ( gallery.length === 1 ) {
			previousButton.style.visibility = 'hidden'
			nextButton.style.visibility = 'hidden'
		}
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
