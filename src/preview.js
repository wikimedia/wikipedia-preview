import '../style/preview.less'

const renderPreview = (lang, data) => {
	const imageUrl = data.imgUrl
	return `
		<div class="wikipediapreviews">
			<div class="wikipediapreviews-header">
				<div class="wikipediapreviews-header-image" style="${imageUrl && `background-image:url('${imageUrl}');background-size:cover;`}"></div>
				<div class="wikipediapreviews-header-wordmark"></div>
				<div class="wikipediapreviews-header-closebtn"></div>
			</div>
			<div class="wikipediapreviews-body">
				${data.extractHtml}
			</div>
			<div class="wikipediapreviews-footer">
				<span class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readmore">Continue Reading</span>
				<a href="${data.pageUrl}" class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readonwiki" target="_blank">Read more on Wikipedia</a>
				<div class="wikipediapreviews-footer-cc"></div>
				<div class="wikipediapreviews-footer-author"></div>
			</div>
		</div>
	`.trim()
}

export { renderPreview }
