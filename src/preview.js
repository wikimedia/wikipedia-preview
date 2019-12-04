import { msg } from './i18n'

const renderPreview = (lang, data) => {
	const image = data.imgUrl ?
		`<div class="image" style="background-image: url('${data.imgUrl}');" />` :
		'';
	const wp = msg(lang, 'wikipedia')
	return `
		<div class="article-preview">
			<div class="text-content">
				<div class="title">${data.title}</div>
				<div class="preview">${data.extractHtml}</div>
				<a href="${data.pageUrl}" target="_blank">${wp}</a>
			</div>
			${image}
		</div>
	`.trim()
}

export { renderPreview }
