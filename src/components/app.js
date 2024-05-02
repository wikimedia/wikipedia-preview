import { popup } from './popup'
import { touchPopup } from './touchPopup'
import { galleryviewer } from './galleryviewer'
import { preview } from './preview'
import { isTouch } from './../utils'

const popupComponent = isTouch ? touchPopup : popup

const app = ( state ) => {
	state.target = document.getElementById( state.targetId )
	state.isTouch = isTouch
	state.content = preview( state )
	return popupComponent( state ) + galleryviewer( state )
}

export default app
