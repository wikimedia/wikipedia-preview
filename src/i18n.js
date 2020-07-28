import en from '../i18n/en.json'

const messages = {
		en
	},

	msg = ( lang, key ) => {
		if ( !messages[ lang ] ) {
			try {
				messages[ lang ] = require( `../i18n/${lang}.json` )
			} catch ( error ) {
				messages[ lang ] = {}
			}
		}
		return messages[ lang ][ key ] || messages.en[ key ] || key
	}

export { msg }
