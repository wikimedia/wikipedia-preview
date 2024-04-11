import { store } from 'reefjs'
import { requestPagePreview, requestPageMedia, requestPageMediaInfo } from './api'
import { getSelectedImageIndex, getSelectedImageTitle } from './utils'

const wpStore = store( {
	title: null,
	lang: null,
	targetId: null,
	pointerPosition: null,
	data: null,
	media: null,
	mediaInfo: {},
	expanded: false,
	colorScheme: 'detect'
}, {
	setColorScheme( state, colorScheme ) {
		state.colorScheme = colorScheme
	},

	trigger( state, targetId, pointerPosition, title, lang ) {
		// reset
		state.data = null
		state.media = null
		state.expanded = false
		state.selectedGalleryItem = null

		// new preview
		state.title = title
		state.lang = lang
		state.targetId = targetId
		state.pointerPosition = pointerPosition

		// get data from apis
		requestPagePreview( lang, title, wpStore.receiveContent )
		requestPageMedia( lang, title, wpStore.receiveMedia )
	},

	receiveContent( state, data ) {
		state.data = data
	},

	receiveMedia( state, media ) {
		// media is [ { caption, thumb, title } ]
		state.media = media
	},

	receiveMediaInfo( state, mediaInfo ) {
		// mediaInfo is { title, author, bestFitImageUrl, description, filePage, license }
		state.mediaInfo[ mediaInfo.title ] = mediaInfo
	},

	close( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		state.targetId = null
	},

	expand( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		state.expanded = true
	},

	clickThumbnail( state, e ) {
		state.selectedGalleryItem = e.target.getAttribute( 'key' )
		wpStore.loadCurrentMediaInfo()
	},

	previousGalleryImage( state ) {
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex > 0 ) {
			state.selectedGalleryItem = state.media[ currentIndex - 1 ].thumb
		}
		wpStore.loadCurrentMediaInfo()
	},

	nextGalleryImage( state ) {
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex < ( state.media.length - 1 ) ) {
			state.selectedGalleryItem = state.media[ currentIndex + 1 ].thumb
		}
		wpStore.loadCurrentMediaInfo()
	},

	loadCurrentMediaInfo( state ) {
		const title = getSelectedImageTitle( state.media, state.selectedGalleryItem )
		if ( !state.mediaInfo[ title ] ) {
			requestPageMediaInfo( state.lang, title, wpStore.receiveMediaInfo )
		}
	},

	closeGallery( state ) {
		state.selectedGalleryItem = null
	}
} )

export default wpStore
