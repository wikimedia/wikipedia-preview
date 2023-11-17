import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from '../preview'
import { getGalleryRow } from '../gallery'

export default {
	title: 'Wikipedia Preview',
	argTypes: {
		touch: {
			name: 'Mobile',
			control: 'boolean'
		},
		lang: {
			name: 'Language',	
			control: 'select',
			options: [ 'en', 'ar', 'atj', 'bn', 'ca', 'cs', 'cy', 'et', 'fa', 'fr', 'he', 'hi', 'ja', 'la', 'ps', 'ru', 'sd', 'sr', 'szl', 'tr', 'ur', 'uz', 'zh' ]
		},
		dir: {
			name: 'Direction',
			control: 'inline-radio',
			options: [ 'LTR', 'RTL' ]
		},
		title: {
			name: 'Article Title',
			control: 'text'
		},
		pageUrl: {
			name: 'Article URL',
			control: 'text'
		},
		extractHtml: {
			name: 'Preview HTML',
			control: 'text'
		},
		imgUrl: {
			name: 'Thumbnail URL',
			control: 'text'
		}
	},
	args: {
		touch: false,
		lang: 'en',
		dir: 'LTR',
		title: 'Cat',
		pageUrl: 'https://en.wikipedia.org/wiki/Cat',
		extractHtml: '<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png'
	},
}

export const StandardWithImage = ( { lang, title, extractHtml, dir, pageUrl, imgUrl, touch } ) => {
	return renderPreview( lang, { title, extractHtml, dir, pageUrl, imgUrl }, touch )
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
	preview.querySelector( '.wikipediapreview-gallery' ).appendChild( getGalleryRow( mediaData, null ) )
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

export const Offline = ( { touch, lang, dir } ) => {
	return renderOffline( touch, lang, dir )
}
