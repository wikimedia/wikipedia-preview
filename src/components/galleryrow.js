import '../../style/gallery.less'

const galleryitem = ( item, index ) => {
	const style = 'background-image: url(' + item.thumb + ');'
	return `
		<div
			class="wikipediapreview-gallery-row-image"
			style="${ style }" onclick="clickThumbnail"
			key="${ item.title }" data-index="${ index }"
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
