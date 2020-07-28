import fallbackMessage from '../i18n/en.json'
const msg = ( lang, key ) => {
	let messages

	try {
		messages = require( `../i18n/${lang}.json` )
	} catch ( error ) {
		// Translation not available, discard
	}

	return ( messages && messages[ key ] ) || fallbackMessage[ key ] || key
}

export { msg }
