import { store } from 'reefjs'
import { requestPagePreview, requestPageMedia, requestPageMediaInfo } from './api'
import { getSelectedImageIndex } from './utils'

const wpStore = store( {
	title: null,
	lang: null,
	targetId: null,
	pointerPosition: null,
	data: null,
	media: null,
	mediaInfo: {},
	expanded: false
}, {
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

		// preload image
		const img = document.createElement( 'img' )
		img.onload = () => {
			wpStore.galleryImageLoaded( mediaInfo.title )
		}
		img.onerror = () => {
			wpStore.galleryImageError( mediaInfo.title )
		}
		img.src = mediaInfo.bestFitImageUrl
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
		state.galleryFocusMode = false
		wpStore.loadMediaInfo()
	},

	previousGalleryImage( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex > 0 ) {
			state.selectedGalleryItem = state.media[ currentIndex - 1 ].thumb
		}
	},

	nextGalleryImage( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		const currentIndex = getSelectedImageIndex( state.media, state.selectedGalleryItem )
		if ( currentIndex < ( state.media.length - 1 ) ) {
			state.selectedGalleryItem = state.media[ currentIndex + 1 ].thumb
		}
	},

	loadMediaInfo( state ) {
		state.media.forEach( ( image ) => {
			if ( !state.mediaInfo[ image.title ] ) {
				requestPageMediaInfo( state.lang, image.title, wpStore.receiveMediaInfo )
			}
		} )
	},

	closeGallery( state ) {
		state.selectedGalleryItem = null
		state.galleryFocusMode = false
		state.galleryCaptionExpanded = false
	},

	toggleGalleryCaption( state ) {
		state.galleryCaptionExpanded = !state.galleryCaptionExpanded
	},

	toggleGalleryFocusMode( state ) {
		state.galleryFocusMode = !state.galleryFocusMode
	},

	galleryImageLoaded( state, title ) {
		if ( state.mediaInfo[ title ] ) {
			state.mediaInfo[ title ].loaded = true
		}
	},

	galleryImageError( state, title ) {
		if ( state.mediaInfo[ title ] ) {
			state.mediaInfo[ title ].error = true
		}
	}
} )

export default wpStore
