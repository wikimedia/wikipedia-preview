import { preview } from '../components/preview'
// import { getGalleryRow } from '../gallery' @todo fix gallery row

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
		colorScheme: {
			name: 'Color Scheme',
			control: 'inline-radio',
			options: [ 'light', 'dark', 'detect' ]
		}
	},
	args: {
		touch: false,
		lang: 'en',
		title: 'Cat',
		pageUrl: 'https://en.wikipedia.org/wiki/Cat',
		extractHtml: '<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png',
		colorScheme: 'light'
	}
}

export const StandardWithImage = ( {
	lang, title, extractHtml, pageUrl, imgUrl, touch, colorScheme
} ) => {
	return preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl, imgUrl },
		isTouch: touch,
		colorScheme
	} )
}

export const Standard = ( { lang, title, extractHtml, pageUrl, touch, colorScheme } ) => {
	return preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl },
		isTouch: touch,
		colorScheme
	} )
}

export const Expanded = ( { lang, title, extractHtml, pageUrl, imgUrl, touch, colorScheme } ) => {
	const template = document.createElement( 'template' )
	const media = [
		{
			thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png'
		}, {
			thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png'
		}
	]
	template.innerHTML = preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl, imgUrl },
		media,
		isTouch: touch,
		colorScheme
	} )
	const popup = template.content.firstChild
	popup.classList.add( 'expanded' )
	// popup.querySelector( '.wikipediapreview-gallery' ).appendChild( getGalleryRow( mediaData, null ) )
	return popup
}

export const Loading = ( { touch, lang, colorScheme } ) => { // @todo add loading state ui
	return preview( {
		lang,
		data: { type: 'loading' },
		isTouch: touch,
		colorScheme
	} )
}

export const Error = ( { touch, lang, colorScheme } ) => {
	return preview( { // @todo mock utils.isOnline()
		lang,
		data: { type: 'error' },
		isTouch: touch,
		colorScheme
	} )
}

export const Disambiguation = Standard

export const DisambiguationWithNoExtract = ( { touch, lang, title, colorScheme } ) => {
	return preview( {
		lang,
		data: { type: 'disambiguation', title },
		isTouch: touch,
		colorScheme: colorScheme
	} )
}

export const Offline = ( { touch, lang, colorScheme } ) => {
	return preview( { // @todo mock utils.isOnline()
		lang,
		data: { type: 'offline' },
		isTouch: touch,
		colorScheme
	} )
}
