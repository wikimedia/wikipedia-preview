import { requestPagePreview } from './api';
import { customEvents } from './event';
import { createPopup } from './popup';
import { renderPreview } from './preview';

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	popupContainer = document.body } ) {
	const globalLang = lang,
		popup = createPopup( popupContainer ),
		events = customEvents( popup ),
		showPopup = ( { target } ) => {
			const title = target.getAttribute( 'data-wp-title' ) || target.textContent,
				lang = target.getAttribute( 'data-wp-lang' ) || globalLang;
			requestPagePreview( lang, title, data => {
				if ( data ) {
					popup.show( renderPreview( lang, data ), target );
				}
			} );
		};

	popup.subscribe( events );

	Array.prototype.forEach.call(
		root.querySelectorAll( selector ),
		node => {
			node.addEventListener( 'mouseenter', showPopup );
		}
	);
}

export { init };
