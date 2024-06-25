const getGalleryRow = ( mediaItems ) => {
	const galleryRow = document.createElement( 'div' )
	galleryRow.classList.add( 'wikipediapreview-gallery-row' )

	if ( mediaItems ) {
		mediaItems.forEach( ( item ) => {
			const image = document.createElement( 'div' )

			image.classList.add( 'wikipediapreview-gallery-image' )
			image.style.backgroundImage = `url(${ item.thumb })`

			galleryRow.appendChild( image )
		} )
	}

	return galleryRow.outerHTML
}

export const getGallery = ( mediaItems ) => {
	if ( mediaItems && mediaItems.length < 3 ) {
		return ''
	}
	return `<div class="wikipediapreview-gallery">${ getGalleryRow( mediaItems ) }</div>`
}
