import '../../style/gallery.less'

const galleryitem = ( item ) => {
	const style = 'background-image: url(' + item.thumb + ');'
	return `
		<div
			class="wikipediapreview-gallery-row-image"
			style="${ style }" onclick="clickThumbnail"
			key="${ item.thumb }"
		>
		</div>
	`
}

const galleryrow = ( { media } ) => {
	if ( !media ) {
		return ''
	}
	const items = media.map( galleryitem ).join( '' )
	return `
		<div class="wikipediapreview-gallery">
			<div class="wikipediapreview-gallery-row">
				${ items }
			</div>
		</div>
	`
}

export { galleryrow }
