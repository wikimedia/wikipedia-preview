import { store } from 'reefjs'
import { requestPagePreview, requestPageMedia, requestPageMediaInfo } from './api'

const wpStore = store( {
	title: null,
	lang: null,
	targetId: null,
	pointerPosition: null,
	data: null,
	media: null,
	mediaInfo: {},
	selectedGalleryIndex: null,
	expanded: false
}, {
	trigger( state, targetId, pointerPosition, title, lang ) {
		// reset
		state.data = null
		state.media = null
		state.expanded = false
		state.selectedGalleryIndex = null

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
		if ( state.mediaInfo[ mediaInfo.title ] ) {
			return // already loaded
		}
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
		state.selectedGalleryIndex = parseInt( e.target.getAttribute( 'data-index' ) )
		state.galleryFocusMode = false
		// Load media info for the selected image and the surrounding images
		wpStore.loadMediaInfo( state.selectedGalleryIndex )
		wpStore.loadMediaInfo( state.selectedGalleryIndex + 1 )
		wpStore.loadMediaInfo( state.selectedGalleryIndex - 1 )
	},

	previousGalleryImage( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		if ( state.selectedGalleryIndex > 0 ) {
			state.selectedGalleryIndex--
			wpStore.loadMediaInfo( state.selectedGalleryIndex - 1 )
		}
	},

	nextGalleryImage( state, e ) {
		e.preventDefault()
		e.stopPropagation()
		if ( state.selectedGalleryIndex < ( state.media.length - 1 ) ) {
			state.selectedGalleryIndex++
			wpStore.loadMediaInfo( state.selectedGalleryIndex + 1 )
		}
	},

	refreshPreview( state ) {
		const { lang, title } = state
		requestPagePreview( lang, title, wpStore.receiveContent )
		requestPageMedia( lang, title, wpStore.receiveMedia )
	},

	loadMediaInfo( state, index ) {
		// out of bounds
		if ( index < 0 || index >= state.media.length ) {
			return
		}
		const title = state.media[ index ].title
		if ( !state.mediaInfo[ title ] ) {
			requestPageMediaInfo( state.lang, title, wpStore.receiveMediaInfo )
		}
	},

	closeGallery( state ) {
		state.selectedGalleryIndex = null
		state.galleryFocusMode = false
		state.galleryCaptionExpanded = false
	},

	toggleGalleryCaption( state, e ) {
		e.preventDefault()
		e.stopPropagation()
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
