import { renderPreview, renderLoading, renderError } from '../preview'

export default {
	title: 'Previews',
	argTypes: {
		touch: { defaultValue: false, control: 'boolean' },
		lang: {
			defaultValue: 'en',
			control: {
				type: 'select',
				options: [ 'en', 'fr', 'hi', 'ks' ]
			}
		},
		dir: {
			defaultValue: 'LTR',
			control: {
				type: 'inline-radio',
				options: [ 'LTR', 'RTL' ]
			}
		},
		title: {
			defaultValue: 'Cat',
			control: 'text'
		},
		pageUrl: {
			defaultValue: 'https://en.wikipedia.org/wiki/Cat',
			control: 'text'
		},
		extractHtml: {
			defaultValue: '<strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			control: 'text'
		}
	}
}

export const Preview = ( { lang, title, extractHtml, dir, pageUrl, touch } ) => {
	return renderPreview( lang, { title, extractHtml, dir, pageUrl }, touch )
}

export const Loading = ( { touch, lang, dir } ) => {
	return renderLoading( touch, lang, dir )
}

export const Error = ( { touch, lang, title, dir } ) => {
	return renderError( touch, lang, title, dir )
}
