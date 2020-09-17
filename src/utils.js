export const getWikipediaAttrFromUrl = url => {
		const regexList = [
			// https://zh.wikipedia.org/wiki/前岐镇"
			// https://en.wikipedia.org/wiki/Cat#Section
			/^https?:\/\/(\w+)(\.m)?\.wikipedia\.org\/wiki\/([^#?]+)/,
			// https://en.wikipedia.org/w/index.php?title=Cat
			// https://zh.wikipedia.org/w/index.php?title=太阳帆&action=purge
			/^https?:\/\/(\w+)(\.m)?\.wikipedia\.org\/w\/index.php\?title=([^#&]+)/
		]

		for ( let i = 0; i < regexList.length; i++ ) {
			const matches = regexList[ i ].exec( url )
			if ( matches ) {
				return { lang: matches[ 1 ], mobile: !!matches[ 2 ], title: matches[ 3 ] }
			}
		}

		return null
	},

	isTouch = 'ontouchstart' in window || ( navigator.maxTouchPoints > 0 ) ||
		( navigator.msMaxTouchPoints > 0 ),

	getDir = lang => {
		const rtl = [ 'ar', 'arc', 'arz', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi', 'pnb', 'ckb', 'mzn', 'glk', 'ug', 'sd', 'azb', 'lrc' ]
		return rtl.indexOf( lang ) === -1 ? 'ltr' : 'rtl'
	},

	defaultParams = {
		format: 'json',
		formatversion: 2,
		origin: '*'
	},

	buildMwApiUrl = ( lang, params ) => {
		params = { ...defaultParams, ...params }
		const baseUrl = `https://${lang}.wikipedia.org/w/api.php`
		return baseUrl + '?' + Object.keys( params ).map( p => {
			return `${p}=${encodeURIComponent( params[ p ] )}`
		} ).join( '&' )
	},

	buildCommonsApiUrl = params => {
		params = { ...defaultParams, ...params }
		const baseUrl = 'https://commons.wikimedia.org/w/api.php'
		return baseUrl + '?' + Object.keys( params ).map( p => {
			return `${p}=${encodeURIComponent( params[ p ] )}`
		} ).join( '&' )
	},

	convertUrlToMobile = url => {
		return url.replace( /https:\/\/(.*?)\./, subDomain => subDomain + 'm.' )
	},

	strip = html => {
		const doc = new window.DOMParser().parseFromString( html, 'text/html' )
		return doc.body.textContent || ''
	},

	sanitizeHTML = html => {
		return html.replace( /(<script>).*(<\/script\s*>)/g, '' )
	}
