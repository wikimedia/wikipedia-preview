import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview } from './preview'
import { isTouch } from './utils'


function init({
	root = document, 
	selector = '[data-wikipedia-preview]', 
	lang = 'en', 
	popupContainer = document.body }) {
	const globalLang = lang
	const popup = isTouch() ? createTouchPopup(popupContainer) : createPopup(popupContainer)
	const events = customEvents(popup)
	popup.subscribe(events)

	const showPopup = ({ target }) => {
		const title = target.getAttribute('data-wp-title') || target.textContent
		const lang = target.getAttribute('data-wp-lang') || globalLang
		requestPagePreview(lang, title, data => {
			if (data) {
				popup.show(renderPreview(lang, data), target)
			}
		})
	}

	Array.prototype.forEach.call(
		root.querySelectorAll(selector),
		node => {
			if (isTouch()) {
				node.addEventListener('touchstart', showPopup)
			} else {
				node.addEventListener('mouseenter', showPopup)
			}
			
		}
	)
}

export { init }
