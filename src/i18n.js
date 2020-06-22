const messages = {
	en: {
		'wikipedia': 'Wikipedia'
	},
	fr: {
		'wikipedia': 'Wikipédia'
	},
	es: {
		'wikipedia': 'Wikipedia'
	}
}

const msg = (lang, key) => {
	return (messages[lang] || messages.en)[key] || key
}

export { msg }
