import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from '../preview'

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
		},
		mediaItems: {
			name: 'Media Items',
			control: 'object'
		},
		prefersColorScheme: {
			name: 'Color Scheme',
			control: 'inline-radio',
			options: [ 'light', 'dark', 'detect' ]
		}
	},
	args: {
		touch: false,
		lang: 'en',
		dir: 'LTR',
		title: 'Cat',
		pageUrl: 'https://en.wikipedia.org/wiki/Cat',
		extractHtml: '<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png',
		prefersColorScheme: 'light',
		mediaItems: [
			{
				caption: 'Cylindrical ivory casket, Siculo-Arabic, Hunt Museum',
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg',
				src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cylindrical_Ivory_Casket.jpg/640px-Cylindrical_Ivory_Casket.jpg',
				title: 'File:Cylindrical_Ivory_Casket.jpg'
			},
			{
				caption: undefined,
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Muizz_Street_-_Egypt.jpg/640px-Muizz_Street_-_Egypt.jpg',
				title: 'File:Muizz_Street_-_Egypt.jpg'
			},
			{
				caption: undefined,
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Porphyrogenetus.jpg/111px-Porphyrogenetus.jpg',
				title: 'File:Porphyrogenetus.jpg'
			},
			{
				caption: 'Wikipedia Homepage',
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png',
				src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png',
				title: 'File:Wikipedia_Main_Page.png'
			},
			{
				caption: 'Wikipedia originally developed from another encyclopedia project called Nupedia',
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png',
				src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nupedia_logo_and_wordmark.png/480px-Nupedia_logo_and_wordmark.png',
				title: 'File:Nupedia_logo_and_wordmark.png'
			},
			{
				caption: 'The Wikipedia Page on December 17, 2001',
				thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg',
				src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/English_Wikipedia_main_page_20011217.jpg/480px-English_Wikipedia_main_page_20011217.jpg',
				title: 'File:English_Wikipedia_main_page_20011217.jpg'
			}
		]
	}
}

export const StandardWithManyImages = ( { lang, title, extractHtml, dir, pageUrl, imgUrl, mediaItems, touch, prefersColorScheme } ) => {
	const media = mediaItems
	return renderPreview( lang, { title, extractHtml, dir, pageUrl, imgUrl, media }, touch, prefersColorScheme )
}

export const StandardWithFewImages = ( { lang, title, extractHtml, dir, pageUrl, imgUrl, mediaItems, touch, prefersColorScheme } ) => {
	const media = mediaItems.slice( 0, 2 )
	return renderPreview( lang, { title, extractHtml, dir, pageUrl, imgUrl, media }, touch, prefersColorScheme )
}

export const Standard = ( { lang, title, extractHtml, dir, pageUrl, touch, prefersColorScheme } ) => {
	const media = []
	return renderPreview( lang, { title, extractHtml, dir, pageUrl, media }, touch, prefersColorScheme )
}

export const Loading = ( { touch, lang, dir, prefersColorScheme } ) => {
	return renderLoading( touch, lang, dir, prefersColorScheme )
}

export const Error = ( { touch, lang, title, dir, prefersColorScheme } ) => {
	return renderError( touch, lang, title, dir, prefersColorScheme )
}

export const Disambiguation = ( { lang, title, extractHtml, dir, pageUrl, touch, prefersColorScheme } ) => {
	const media = [] // disambiguation doesn't show gallery row
	return renderPreview( lang, { title, extractHtml, dir, pageUrl, media }, touch, prefersColorScheme )
}

export const DisambiguationWithNoExtract = ( { touch, lang, title, dir, prefersColorScheme } ) => {
	return renderDisambiguation( touch, lang, title, dir, prefersColorScheme )
}

export const Offline = ( { touch, lang, dir, prefersColorScheme } ) => {
	return renderOffline( touch, lang, dir, prefersColorScheme )
}
