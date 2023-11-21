import en from '../i18n/en.json'

const messages = {
	en
}

const msg = async ( lang, key, ...params ) => {
	// debugger
	await import(`../i18n/${lang}.json`).then( ( translations ) => {
		console.log('translations.default', translations.default);
		messages[ lang ] = translations.default
		// let message = messages[ lang ] && messages[ lang ][ key ] || messages.en[ key ] || key
		// params.forEach( ( param, i ) => {
		// 	message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
		// } )
		// return message
	}).catch( ( error ) => {
		messages[ lang ] = {}
		// let message = messages.en[ key ] || key
		// params.forEach( ( param, i ) => {
		// 	message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
		// } )
		// return message
	})

	console.log('messages', messages);

	let message = messages[ lang ] && messages[ lang ][ key ] || messages.en[ key ] || key
	params.forEach( ( param, i ) => {
		message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
	} )

	console.log('after awaiting... message', message);
	return message

	

	// if ( !messages[ lang ] ) {
	// 	try {
	// 		messages[ lang ] = require( `../i18n/${lang}.json` )
	// 	} catch ( error ) {
	// 		messages[ lang ] = {}
	// 		console.log('error', error);
	// 	}
	// }
	// let message = messages[ lang ] && messages[ lang ][ key ] || messages.en[ key ] || key
	// params.forEach( ( param, i ) => {
	// 	message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
	// } )
	// return message
}

export { msg }
