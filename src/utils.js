import DOMPurify from 'dompurify'

const getWikipediaAttrFromUrl = url => {
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
}

const isTouch = 'ontouchstart' in window || ( navigator.maxTouchPoints > 0 ) ||
	( navigator.msMaxTouchPoints > 0 )

const isOnline = () => window.navigator.onLine

const getDir = lang => {
	const rtl = [ 'ar', 'arc', 'arz', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi', 'pnb', 'ckb', 'mzn', 'glk', 'ug', 'sd', 'azb', 'lrc' ]
	return rtl.indexOf( lang ) === -1 ? 'ltr' : 'rtl'
}

const defaultParams = {
	format: 'json',
	formatversion: 2,
	origin: '*'
}

const buildMwApiUrl = ( lang, params ) => {
	params = { ...defaultParams, ...params }
	const baseUrl = `https://${lang}.wikipedia.org/w/api.php`
	return baseUrl + '?' + Object.keys( params ).map( ( p ) => {
		return `${p}=${encodeURIComponent( params[ p ] )}`
	} ).join( '&' )
}

const convertUrlToMobile = url => {
	return url.replace( /https:\/\/(.*?)\./, ( subDomain ) => subDomain + 'm.' )
}

const strip = html => {
	const doc = new window.DOMParser().parseFromString( html, 'text/html' )
	return doc.body.textContent || ''
}

const sanitizeHTML = html => {
	return DOMPurify.sanitize( html )
}

const getDeviceSize = () => {
	return { height: window.innerHeight, width: window.innerWidth }
}

const getAnalyticsQueryParam = () => 'wprov=wppw1'

const buildWikipediaUrl = ( lang, title, touch, analytics = true ) => {
	return `https://${lang}${touch ? '.m' : ''}.wikipedia.org/wiki/${encodeURIComponent( title )}${analytics ? `?${getAnalyticsQueryParam()}` : ''}`
}

const version = () => {
	/* eslint-disable-next-line no-undef, no-console */
	console.log( `Wikipedia Preview - version ${APP_VERSION} (${GIT_HASH})` )
}

const logError = ( ...err ) => {
	console.error.apply( console, err ) // eslint-disable-line no-console
}

export {
	getWikipediaAttrFromUrl, isTouch, isOnline, getDir, buildMwApiUrl,
	convertUrlToMobile, strip, sanitizeHTML, getDeviceSize, getAnalyticsQueryParam,
	buildWikipediaUrl, version, logError
}
