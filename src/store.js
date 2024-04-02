import { store } from 'reefjs'
import { requestPagePreview } from './api'

const wpStore = store( {
	title: null,
	lang: null,
	targetId: null,
	position: null,
	data: null,
	colorScheme: 'detect'
}, {
	setColorScheme( state, colorScheme ) {
		state.colorScheme = colorScheme
	},
	trigger( state, targetId, position, title, lang ) {
		state.title = title
		state.lang = lang
		state.targetId = targetId
		state.position = position
		state.data = null
		requestPagePreview( lang, title, wpStore.receiveContent )
	},

	receiveContent( state, data ) {
		state.data = data
	},

	close( state ) {
		state.targetId = null
	}
} )

export default wpStore
