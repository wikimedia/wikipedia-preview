import { showFullscreenGallery } from './fullscreen'

export const GalleryRow = ( mediaItems, lang, dir ) => {

	const images = mediaItems.map( item => {
		return `<div class="wikipediapreview-gallery-image" style="background-image:url('${item.thumb}')"></div>`
	} ).join( '' )

	return {
		template: `<div class="wikipediapreview-gallery-row">${images}</div>`,
		ui: {
			container: '.wikipediapreview-gallery-image',
			image: '.wikipediapreview-gallery-image'
		},
		events: {
			'image click': e => {
				const selected = e.target.style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )
				showFullscreenGallery( mediaItems, selected, lang, dir )
			}
		}
	}
}
