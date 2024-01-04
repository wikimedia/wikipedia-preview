import { buildWikipediaUrl } from '../utils'
import wikipediaPreview from '../index'

export default {
	title: 'Targets',
	argTypes: {
		lang: {
			name: 'Language',
			control: 'select',
			options: [ 'en', 'fr', 'hi', 'ks', 'he', 'sv' ]
		},
		title: {
			name: 'Article Title',
			control: 'text'
		}
	},
	args: {
		lang: 'en',
		title: 'Cat'
	}
}

export const Hyperlink = ( { lang, title } ) => {
	const container = document.createElement( 'div' )
	const template = `<a href="${ buildWikipediaUrl( lang, title, true, false ) }">${ title } (${ lang })</a>`
	container.innerHTML = template
	wikipediaPreview.init( { root: container, detectLinks: true } )
	return container
}

export const Image = ( { lang, title } ) => {
	const container = document.createElement( 'div' )
	const template = `<a href="${ buildWikipediaUrl( lang, title, true, false ) }"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Wikipedia-logo-v2.png"></a>`
	container.innerHTML = template
	wikipediaPreview.init( { root: container, detectLinks: true } )
	return container
}

export const Text = ( { lang, title } ) => {
	const container = document.createElement( 'div' )
	const template = `<span class="wmf-wp-with-preview" data-wikipedia-preview data-wp-title="${ title }">${ title } (${ lang })</span>`
	container.innerHTML = template
	wikipediaPreview.init( { root: container, lang } )
	return container
}
