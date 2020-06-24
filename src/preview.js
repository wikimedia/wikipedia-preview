// @todo change the inline background image to stylesheets

const renderPreview = (lang, data) => {
	const imageUrl = data.imgUrl || '../images/wikipedia-logo.svg'
	return `
		<div class="wikipediapreviews">
			<div class="wikipediapreviews-header">
				<div class="wikipediapreviews-header-image" style="background-image:url('${imageUrl}');background-size:${data.imgUrl ? 'cover' : 'auto'};"></div>
				<div class="wikipediapreviews-header-wordmark" style="background-image:url('../images/wikipedia-trademark.svg')"></div>
				<div class="wikipediapreviews-header-closebtn" style="background-image:url('../images/close.svg')"></div>
			</div>
			<div class="wikipediapreviews-body">
				${data.extractHtml}
				<div class="wikipediapreviews-body-gallery">
					<p> Gallery Placeholder </p>
				</div>
			</div>
			<div class="wikipediapreviews-footer">
				<span class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readmore">Continue Reading</span>
				<a href="${data.pageUrl}" class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readonwiki" target="_blank">Read more on Wikipedia</a>
			</div>
			<div class="wikipediapreviews-cc"><img src="../images/cc-attribution.svg"/></div>
			<div class="wikipediapreviews-author"><img src="../images/author-attribution.svg"/></div>
		</div>
	`.trim()
}

export { renderPreview }
