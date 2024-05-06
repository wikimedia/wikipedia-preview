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
		async ( { args: { lang, title } } ) => ( { // eslint-disable-line
			articleText: await ( await fetch( `https://${ lang }.wikipedia.org/api/rest_v1/page/mobile-html/${ encodeURIComponent( title ) }` ) ).text()
		} )
	]
}

export const Sections = ( { lang, title }, { loaded: { articleText } } ) => {
	const doc = new DOMParser().parseFromString( articleText, 'text/html' )
	const sections = Array.from( doc.querySelectorAll( 'section' ) )

	const container = document.createElement( 'div' )
	sections.forEach( ( sectionElement ) => {
		let titleElement = sectionElement.querySelector( 'h2, h3, h4, h5, h6' )
		if ( !titleElement ) {
			titleElement = doc.createElement( 'h2' )
			titleElement.textContent = 'Summary'
		}
		titleElement.setAttribute( 'data-wikipedia-preview', '' )
		titleElement.setAttribute( 'data-wp-title', title + '#' + titleElement.id )
		titleElement.setAttribute( 'data-wp-lang', lang )
		titleElement.style.maxWidth = 'fit-content'
		container.appendChild( titleElement )
		return titleElement.outerHTML
	} )
	wikipediaPreview.init( { root: container, lang } )
	return container
}
