import wikipediaPreview from '../index'

export default {
	title: 'Sections',
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
	},
	loaders: [
		async ( { args: { lang, title } } ) => { // eslint-disable-line
			const p = new Promise( ( resolve ) => {
				wikipediaPreview.getSections( lang, title, ( info ) => {
					resolve( info.sections )
				} )
			} )
			return {
				sections: await p
			}
		}
	]
}

export const Sections = ( { lang, title }, { loaded: { sections } } ) => {
	const container = document.createElement( 'div' )
	sections.forEach( ( section ) => {
		const titleElement = document.createElement( section.level )
		titleElement.textContent = section.id
		titleElement.setAttribute( 'data-wikipedia-preview', '' )
		titleElement.setAttribute( 'data-wp-title', title + '#' + section.id )
		titleElement.setAttribute( 'data-wp-lang', lang )
		titleElement.style.maxWidth = 'fit-content'
		container.appendChild( titleElement )
	} )
	wikipediaPreview.init( { root: container, lang } )
	return container
}
