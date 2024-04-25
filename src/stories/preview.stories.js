import { preview } from '../components/preview'

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
		}
	},
	args: {
		touch: false,
		lang: 'en',
		title: 'Cat',
		pageUrl: 'https://en.wikipedia.org/wiki/Cat',
		extractHtml: '<p><strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moons_of_solar_system-he.svg/langhe-320px-Moons_of_solar_system-he.svg.png'
	}
}

export const StandardWithImage = ( {
	lang, title, extractHtml, pageUrl, imgUrl, touch
} ) => {
	return preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl, imgUrl },
		isTouch: touch
	} )
}

export const Standard = ( { lang, title, extractHtml, pageUrl, touch } ) => {
	return preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl },
		isTouch: touch
	} )
}

export const Expanded = ( { lang, title, extractHtml, pageUrl, imgUrl, touch } ) => {
	const media = [
		{
			thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/225px-Wikipedia-logo-v2.svg.png'
		}, {
			thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/960px-Wikipedia_Main_Page.png'
		}
	]
	const template = preview( {
		lang,
		data: { type: 'standard', title, extractHtml, pageUrl, imgUrl },
		expanded: true,
		media,
		isTouch: touch
	} )
	return template
}

export const Loading = ( { touch, lang } ) => {
	return preview( {
		lang,
		data: { type: 'loading' },
		isTouch: touch
	} )
}

export const Error = ( { touch, lang } ) => {
	return preview( {
		lang,
		data: { type: 'error' },
		isTouch: touch
	} )
}

export const Disambiguation = Standard

export const DisambiguationWithNoExtract = ( { touch, lang, title } ) => {
	return preview( {
		lang,
		data: { type: 'disambiguation', title },
		isTouch: touch
	} )
}

export const Offline = ( { touch, lang } ) => {
	return preview( {
		lang,
		data: { type: 'offline' },
		isTouch: touch
	} )
}
