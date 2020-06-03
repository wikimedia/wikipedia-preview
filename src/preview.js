import { msg } from './i18n'

const renderPreview = (lang, data) => {
	const image = data.imgUrl ?
		`<div class="wp-image" style="background-image: url('${data.imgUrl}');" />` :
		'';
	const wp = msg(lang, 'wikipedia')
	return `
		<div class="wp-article-preview">
			<div class="wp-text-content">
				<div class="wp-title">${data.title}</div>
				<div class="wp-preview">${data.extractHtml}</div>
				<a class="wp-link" href="${data.pageUrl}" target="_blank">${wp}</a>
			</div>
			${image}
		</div>
	`.trim()
}

export { renderPreview }
