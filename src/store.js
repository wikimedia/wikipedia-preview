import { store } from 'reefjs'
import { requestPagePreview, requestPageMedia } from './api'
import { getSelectedImageIndex } from './utils'

const wpStore = store( {
	title: null,
	lang: null,
	targetId: null,
	pointerPosition: null,
	data: null,
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
		state.media = media
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
	},

	previousGalleryImage( state ) {
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex > 0 ) {
			state.selectedGalleryItem = state.media[ currentIndex - 1 ].thumb
		}
	},

	nextGalleryImage( state ) {
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex < ( state.media.length - 1 ) ) {
			state.selectedGalleryItem = state.media[ currentIndex + 1 ].thumb
		}
	},

	closeGallery( state ) {
		state.selectedGalleryItem = null
	}
} )

export default wpStore
