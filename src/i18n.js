import fallbackMessage from '../i18n/en.json'

const messages = {
		en: fallbackMessage
	},

	msg = ( lang, key ) => {
		try {
			if ( !messages[ lang ] ) {
				messages[ lang ] = require( `../i18n/${lang}.json` )
			}
		} catch ( error ) {
			// Translation not available
		}

		let message = messages[ lang ]
		return ( message && message[ key ] ) || fallbackMessage[ key ] || key
	}

export { msg }
