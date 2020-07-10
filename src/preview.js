import '../style/preview.less'

const getGalleryRow = ( mediaItems ) => {
		let galleryRow = ''
		mediaItems.forEach( item => {
			// TODO - add click/touch handler to display fullscreen gallery popup
			galleryRow += `<img class="wikipediapreview-gallery-image" src=${item.thumbnail}>`
		} )
		return galleryRow
	},

	renderPreview = ( lang, data, isTouch ) => {
		const imageUrl = data.summary.imgUrl
		return `
		<div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
			<div class="wikipediapreview-header">
				<div class="wikipediapreview-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreview-header-wordmark"></div>
				<div class="wikipediapreview-header-closebtn"></div>
			</div>
			<div class="wikipediapreview-body">
				${data.summary.extractHtml}
			</div>
			<div class="wikipediapreview-gallery">
				${getGalleryRow( data.media )}
			</div>
			<div class="wikipediapreview-footer">
				<span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">Continue Reading</span>
				<a href="${data.summary.pageUrl}" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank">Read more on Wikipedia</a>
				<div class="wikipediapreview-footer-cc"></div>
				<div class="wikipediapreview-footer-author"></div>
			</div>
		</div>
	`.trim()
	}

export { renderPreview }
