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
			popup.element.component.wikipediapreviews.classList.add( 'expanded' )
		},

		onTouchStart = e => {
			const targetClassName = e.target.parentNode.className
			if ( targetClassName.indexOf( 'wikipediapreviews-' ) === -1 ) {
				popup.hide()
			}
		},

		onHide = element => {
			element.component.closeBtn.removeEventListener( 'click', popup.hide )
			element.component.readMore.removeEventListener( 'click', onExpand )

			if ( isTouch() ) {
				document.removeEventListener( 'touchstart', onTouchStart, true )
			} else {
				element.removeEventListener( 'mouseleave', onMouseLeave )
				element.currentTargetElement.removeEventListener( 'mouseleave', onMouseLeave )
			}
		},

		onShow = element => {
			element.component = {
				wikipediapreviews: element.querySelector( '.wikipediapreviews' ),
				closeBtn: element.querySelector( '.wikipediapreviews-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreviews-footer-cta-readmore' ),
				content: element.querySelector( '.wikipediapreviews-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			element.component.closeBtn.addEventListener( 'click', popup.hide )
			element.component.readMore.addEventListener( 'click', onExpand )

			if ( isTouch() ) {
				document.addEventListener( 'touchstart', onTouchStart, true )
			} else {
				element.addEventListener( 'mouseleave', onMouseLeave )
				element.currentTargetElement.addEventListener( 'mouseleave', onMouseLeave )
			}
		}

	return { onHide, onShow, onExpand }
}
