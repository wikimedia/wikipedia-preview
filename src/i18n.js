import en from '../i18n/en.json'

const messages = {
	en
}

const msg = ( lang, key, ...params ) => {
	if ( !messages[ lang ] ) {
		try {
			messages[ lang ] = require( `./../i18n/${lang}.json` ).default
		} catch ( error ) {
			messages[ lang ] = {}
		}
	}
	let message = messages[ lang ] && messages[ lang ][ key ] || messages.en[ key ] || key
	params.forEach( ( param, i ) => {
		message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
	} )
	return message
}

export { msg }
