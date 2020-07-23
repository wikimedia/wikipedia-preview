import { requestPageMedia } from './api'
import { renderPreviewMedia } from './preview'

export const getWikipediaAttrFromUrl = url => {
		const regexList = [
		// https://en.wikipedia.org/wiki/Charles_Darwin
			/^https?:\/\/(\w+)(\.m)?\.wikipedia\.org\/wiki\/(\w+)/,
			// https://en.wikipedia.org/w/index.php?title=Cat
			/^https?:\/\/(\w+)(\.m)?\.wikipedia\.org\/w\/index.php\?title=(\w+)/
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

	addMiniGalleryRow = ( lang, title ) => {
		requestPageMedia( lang, title, mediaData => {
			if ( mediaData ) {
				renderPreviewMedia( document, mediaData )
			}
		} )
	}
