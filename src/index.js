import { fetchPagePreview } from './api'
import { createPopup } from './popup'
import { renderPreview } from './preview'
import '../style/popup.less'

function init({root, selector, lang, popupContainer}={}) {
	const globalLang = lang || 'en'
	root = root || document
	selector = selector || '[data-wikipedia-preview]'
	popupContainer = popupContainer || document.body

	const popup = createPopup(popupContainer)

	const mouseEnter = ({ target }) => {
		const title = target.getAttribute('data-wp-title') || target.textContent
		const lang = target.getAttribute('data-wp-lang') || globalLang
		fetchPagePreview(lang, title).then(data => {
				if (data) {
					popup.show(renderPreview(lang, data), target)
				}
		})
	}

	Array.prototype.forEach.call(
		root.querySelectorAll(selector),
		function (node) {
			node.addEventListener('mouseenter', mouseEnter)
		}
	)
}

export { init }
