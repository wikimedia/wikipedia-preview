import { showFullscreenGallery } from './fullscreen'

export const getGalleryRow = ( mediaItems, popup ) => {
	const galleryRow = document.createElement( 'div' )
	galleryRow.classList.add( 'wikipediapreview-gallery-row' )

	mediaItems.forEach( item => {
		const image = document.createElement( 'div' )

		image.classList.add( 'wikipediapreview-gallery-image' )
		image.style.backgroundImage = `url(${item.thumb})`
		image.addEventListener( 'click', ( e ) => {
			const selected = e.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )
			showFullscreenGallery( mediaItems, selected, popup.lang, popup.dir )
		} )

		galleryRow.appendChild( image )
	} )

	return galleryRow
}
