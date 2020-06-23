const renderPreview = (lang, data) => {
	const imageUrl = data.imgUrl || 'w-icon-url'
	return `
		<div class="wikipediapreviews">
			<div class="wikipediapreviews-header">
				<div class="wikipediapreviews-header-image" style="background-image:url('${imageUrl}')"></div>
				<div class="wikipediapreviews-header-wordmark">WikipediA</div>
				<div class="wikipediapreviews-header-closebtn">X</div>
			</div>
			<div class="wikipediapreviews-body">
				${data.extractHtml}
				<div class="wikipediapreviews-body-gallery">
					<p> Gallery Placeholder </p>
				</div>
			</div>
			<div class="wikipediapreviews-footer">
				<span class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readmore">Continue Reading</span>
				<a href="${data.pageUrl}" class="wikipediapreviews-footer-cta wikipediapreviews-footer-cta-readonwiki">Read more on Wikipedia<a>
			</div>
		</div>
	`.trim()
}

export { renderPreview }
