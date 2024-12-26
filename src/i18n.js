import en from '../i18n/en.json'

const messages = {
	en
}

const loadMessagesForLang = ( lang ) => {
	if ( !messages[ lang ] ) {
		// eslint-disable-next-line es-x/no-dynamic-import
		return import( `./../i18n/${ lang }.json` )
			.then( ( module ) => {
				messages[ lang ] = module.default
			} )
			.catch( () => {
				messages[ lang ] = {}
			} )
	}

	return Promise.resolve()
}

const msg = ( lang, key, ...params ) => {
	let message = messages[ lang ] && messages[ lang ][ key ] || messages.en[ key ] || key
	params.forEach( ( param, i ) => {
		message = message.replace( new RegExp( `\\$${ i + 1 }`, 'g' ), param )
	} )
	return message
}

export { loadMessagesForLang, msg }
