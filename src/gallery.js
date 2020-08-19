import { msg } from './i18n'

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
								<div class="wp-gallery-popup-loading-spinner">
									<div class="wp-gallery-popup-loading-spinner-animation">
										<div class="wp-gallery-popup-loading-spinner-animation-bounce"></div>
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

	toggleLoading = ( loading, image, lang ) => {
		const text = loading.querySelector( '.wp-gallery-popup-loading-text' ),
			error = loading.querySelector( '.wp-gallery-popup-loading-error' ),
			refresh = loading.querySelector( '.wp-gallery-popup-loading-error-refresh' ),
			spinner = loading.querySelector( '.wp-gallery-popup-loading-spinner' ),

			timeoutId = setTimeout( () => {
				text.innerText = msg( lang, 'gallery-loading-still' )
				text.style.visibility = 'visible'
			}, 5000 ),

			onLoad = () => {
				clearTimeout( timeoutId )
				spinner.style.visibility = 'hidden'
				text.style.visibility = 'hidden'
				image.style.visibility = 'visible'
				image.removeEventListener( 'load', onLoad )
			},

			onRefresh = () => {
				toggleLoading( loading, image, lang )
				image.src = gallery[ current ].src
				refresh.removeEventListener( 'click', onRefresh )
			},

			onError = () => {
				clearTimeout( timeoutId )
				error.style.visibility = 'visible'
				spinner.style.visibility = 'hidden'
				text.innerText = msg( lang, 'gallery-loading-error' )
				text.style[ 'font-size' ] = '16px'
				text.style.visibility = 'visible'
				refresh.innerText = msg( lang, 'gallery-loading-error-refresh' )
				refresh.style.visibility = 'visible'
				refresh.addEventListener( 'click', onRefresh )
				image.removeEventListener( 'error', onError )
			}

		spinner.style.visibility = 'visible'
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

	renderNext = ( galleryContainer, lang ) => {
		const image = galleryContainer.querySelector( 'img' ),
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			nextButton = galleryContainer.querySelector( '.next' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			next = current + 1,
			loading = galleryContainer.querySelector( '.wp-gallery-popup-loading' )

		if ( gallery[ next ] ) {
			toggleLoading( loading, image, lang )
			image.src = gallery[ next ].src
			caption.innerText = gallery[ next ].caption ? gallery[ next ].caption : ''
			nextButton.style.opacity = gallery[ next + 1 ] ? '1' : '0.5'
			previousButton.style.opacity = current === 0 ? '1' : null
			current += 1
		}
	},

	renderPrevious = ( galleryContainer, lang ) => {
		const image = galleryContainer.querySelector( 'img' ),
			caption = galleryContainer.querySelector( '.wp-gallery-popup-caption' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			nextButton = galleryContainer.querySelector( '.next' ),
			previous = current - 1,
			loading = galleryContainer.querySelector( '.wp-gallery-popup-loading' )

		if ( gallery[ previous ] ) {
			toggleLoading( loading, image, lang )
			image.src = gallery[ previous ].src
			caption.innerText = gallery[ previous ].caption ? gallery[ previous ].caption : ''
			previousButton.style.opacity = gallery[ previous - 1 ] ? '1' : '0.5'
			nextButton.style.opacity = current === gallery.leght - 1 ? '1' : null
			current -= 1
		}
	},

	showFullscreenGallery = ( event, mediaItems, popup ) => {
		const fullscreenGallery = getFullScreenGallery(),
			selected = event.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' ),
			galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' ),
			lang = popup.lang

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
			nextButton = galleryContainer.querySelector( '.next' ),
			previousButton = galleryContainer.querySelector( '.previous' ),
			closeButton = galleryContainer.querySelector( '.close' )

		toggleLoading( loading, image, lang )

		image.src = gallery[ current ].src

		caption.innerText = gallery[ current ].caption ? gallery[ current ].caption : ''

		closeButton.addEventListener( 'click', () => {
			hideFullscreenGallery( galleryContainer )
		} )

		nextButton.style.opacity = current === gallery.length - 1 ? '0.5' : '1'
		nextButton.addEventListener( 'click', () => {
			renderNext( galleryContainer, lang )
		} )

		previousButton.style.opacity = current === 0 ? '0.5' : '1'
		previousButton.addEventListener( 'click', () => {
			renderPrevious( galleryContainer, lang )
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
