import { renderPreview, renderLoading, renderError, renderDisambiguation } from '../preview'
import { GalleryRow } from '../gallery'
import render from '../render'

export default {
	title: 'Wikipedia Preview',
	argTypes: {
		touch: {
			name: 'Mobile',
			defaultValue: false,
			control: 'boolean'
		},
		lang: {
			name: 'Language',
			defaultValue: 'en',
			control: {
				type: 'select',
				options: [ 'en', 'fr', 'hi', 'ks', 'he' ]
			}
		},
		dir: {
			name: 'Direction',
			defaultValue: 'LTR',
			control: {
				type: 'inline-radio',
				options: [ 'LTR', 'RTL' ]
			}
		},
		title: {
			name: 'Article Title',
			defaultValue: 'Cat',
			control: 'text'
		},
		pageUrl: {
			name: 'Article URL',
			defaultValue: 'https://en.wikipedia.org/wiki/Cat',
			control: 'text'
		},
		extractHtml: {
			name: 'Preview HTML',
			defaultValue: '<strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			control: 'text'
		}
	}
}

export const Standard = ( { lang, title, extractHtml, dir, pageUrl, touch } ) => {
	return renderPreview( lang, { title, extractHtml, dir, pageUrl }, touch )
}

export const Expanded = ( { lang, title, extractHtml, dir, pageUrl, touch } ) => {
	const template = document.createElement( 'template' )
	template.innerHTML = renderPreview( lang, { title, extractHtml, dir, pageUrl }, touch )
	const preview = template.content.firstChild
	preview.classList.add( 'expanded' )
	const mediaData = [
		{
			caption: 'caption1',
			source: 'source1',
			thumb: 'thumb1',
			title: 'title1'
		}, {
			caption: 'caption2',
			source: 'source2',
			thumb: 'thumb2',
			title: 'title2'
		}
	]
	render( GalleryRow( mediaData, null ), preview.querySelector( '.wikipediapreview-gallery' ) )
	return preview
}

export const Loading = ( { touch, lang, dir } ) => {
	return renderLoading( touch, lang, dir )
}

export const Error = ( { touch, lang, title, dir } ) => {
	return renderError( touch, lang, title, dir )
}

export const Disambiguation = ( { touch, lang, title, dir } ) => {
	return renderDisambiguation( touch, lang, title, dir )
}
