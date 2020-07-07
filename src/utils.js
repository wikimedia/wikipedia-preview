export const getWikipediaAttrFromUrl = url => {
	const matches = /^https?:\/\/(\w+)(\.m)?\.wikipedia\.org\/wiki\/(\w+)/.exec( url )
	return matches ? { lang: matches[ 1 ], title: matches[ 3 ] } : null
}
