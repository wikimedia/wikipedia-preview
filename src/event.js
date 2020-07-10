import { isTouch } from './utils'

export const customEvents = popup => {
	const onMouseLeave = e => {
			const toElement = e.toElement || e.relatedTarget || e.target
			if ( toElement !== popup.element.currentTargetElement &&
			!popup.element.contains( toElement ) ) {
				popup.hide()
			}
		},

		onExpand = () => {
			popup.element.component.wikipediapreview.classList.add( 'expanded' )
		},

		onTouchStart = e => {
			const toElement = e.target
			if ( !popup.element.contains( toElement ) ) {
				popup.hide()
			}
		},

		onHide = element => {
			element.component.closeBtn.removeEventListener( 'click', popup.hide )
			element.component.readMore.removeEventListener( 'click', onExpand )

			if ( isTouch ) {
				document.removeEventListener( 'touchstart', onTouchStart, true )
			} else {
				element.removeEventListener( 'mouseleave', onMouseLeave )
				element.currentTargetElement.removeEventListener( 'mouseleave', onMouseLeave )
			}
		},

		onShow = element => {
			element.component = {
				wikipediapreview: element.querySelector( '.wikipediapreview' ),
				closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreview-footer-cta-readmore' ),
				content: element.querySelector( '.wikipediapreview-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			element.component.closeBtn.addEventListener( 'click', popup.hide )
			element.component.readMore.addEventListener( 'click', onExpand )

			if ( isTouch ) {
				document.addEventListener( 'touchstart', onTouchStart, true )
			} else {
				element.addEventListener( 'mouseleave', onMouseLeave )
				element.currentTargetElement.addEventListener( 'mouseleave', onMouseLeave )
			}
		}

	return { onHide, onShow, onExpand }
}
