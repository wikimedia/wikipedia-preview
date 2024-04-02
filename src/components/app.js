import { popup } from './popup'
import { touchPopup } from './touchPopup'
import { preview } from './preview'
import { isTouch } from './../utils'

const actualPopup = isTouch ? touchPopup : popup

const app = ( state ) => {
	const target = document.getElementById( state.targetId )
	const content = preview( state.lang, state.data, isTouch, state.colorScheme )
	return actualPopup( target, state.position, content )
}

export default app
