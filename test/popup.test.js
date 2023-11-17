import assert from 'assert'
import sinon from 'sinon'
import { describe, test, beforeAll } from 'vitest'
import { computePopupPosition, createPopup } from '../src/popup'
import { JSDOM } from 'jsdom'

describe( 'Popup', () => {
	describe( 'computePopupPosition', () => {

		describe( `
	__________________________
	|                          |
	|       ___                |
	|      |___|               |
	|       _^_______          |
	|      |         |         |
	|      |         |         |
	|      |_________|         |
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 50, left: 60, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is under the target', () => assert.equal( position.top, 75 ) )
			test( 'is left-aligned', () => assert.equal( position.left, 60 ) )
			test( 'does not specify bottom', () => assert.equal( position.bottom, '' ) )
		}
		)

		describe( `
	__________________________
	|                          |
	|                   ___    |
	|                  |___|   |
	|            ________^_    |
	|           |          |   |
	|           |          |   |
	|           |__________|   |
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 50, left: 370, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is under the target', () => assert.equal( position.top, 75 ) )
			test( 'is right-aligned', () => assert.equal( position.left, 350 ) )
			test( 'does not specify bottom', () => assert.equal( position.bottom, '' ) )
		}
		)

		describe( `
	__________________________
	|                          |
	|       _________          |
	|      |         |         |
	|      |         |         |
	|      |_________|         |
	|       _v_                |
	|      |___|               |
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 310, left: 70, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is over the target', () => assert.equal( position.bottom, 90 ) )
			test( 'is left-aligned', () => assert.equal( position.left, 70 ) )
			test( 'does not specify top', () => assert.equal( position.top, '' ) )
		}
		)

		describe( `
	__________________________
	|                          |
	|            __________    |
	|           |          |   |
	|           |          |   |
	|           |__________|   |
	|                   _v_    |
	|                  |___|   |
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 310, left: 410, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is over the target', () => assert.equal( position.bottom, 90 ) )
			test( 'is right-aligned', () => assert.equal( position.left, 390 ) )
			test( 'does not specify top', () => assert.equal( position.top, '' ) )
		}
		)

		describe( `
	__________________________
	|                          |
	|       ___                |
	|      |___|              ||
	|       _^_______         || <- scrollbar
	|      |         |        ||
	|      |         |         |
	|      |_________|         |
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 50, left: 60, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is under the target', () => assert.equal( position.top, 75 ) )
			test( 'is left-aligned', () => assert.equal( position.left, 60 ) )
			test( 'does not specify bottom', () => assert.equal( position.bottom, '' ) )
		}
		)

		describe( `
	__________________________
	|       _________          |
	|      |         |         |
	|      |         |         |
	|      |_________|         |
	|       _v_               ||
	|      |___|              ||
	|                         || <- scrollbar
	|                          |
	|__________________________|
			`,
		() => {
			let position
			const targetRect = { top: 310, left: 70, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is over the target', () => assert.equal( position.bottom, 90 ) )
			test( 'is left-aligned', () => assert.equal( position.left, 70 ) )
			test( 'does not specify top', () => assert.equal( position.top, '' ) )
		}
		)

		describe( `
	__________________________
	|                          |
	|            __________    |
	|           |          |   |
	|           |          |   |
	|           |__________|   |
	|                   _v_    |
	|                  |___|   |
	|                          |
	|__----____________________|
		^
	scrollbar
			`,
		() => {
			let position
			const targetRect = { top: 310, left: 410, height: 25, width: 50 }
			const popupSize = { width: 70, height: 40 }
			const viewport = { width: 500, height: 400 }
			beforeAll( () => {
				position = computePopupPosition( targetRect, popupSize.width, popupSize.height,
					viewport.width, viewport.height )
			} )
			test( 'is over the target', () => assert.equal( position.bottom, 90 ) )
			test( 'is right-aligned', () => assert.equal( position.left, 390 ) )
			test( 'does not specify top', () => assert.equal( position.top, '' ) )
		}
		)

	} )

	describe( 'createPopup', () => {
		const onShowCallback = sinon.spy(),
			onHideCallback = sinon.spy()

		let dom,
			popup,
			popupElement

		beforeAll( () => {
			dom = new JSDOM( `
				<html>
					<body>
						<span class="target">Cat</span>
						<div class="popup-container" />
					</body>
				</html>
			` )
			const doc = dom.window.document
			popup = createPopup( doc.querySelector( '.popup-container' ), dom.window )
			popup.subscribe( { onShow: onShowCallback, onHide: onHideCallback } )
			popupElement = doc.querySelector( '.wp-popup' )
		} )

		test( 'adds a hidden popup to the dom', () => {
			assert.equal( popupElement.style.visibility, 'hidden' )
		} )

		test( 'shows content next to a target', () => {
			const target = dom.window.document.querySelector( '.target' )
			popup.show( 'Hello World', target, { x: 1, y: 1 } )
			assert.equal( popupElement.style.visibility, 'visible' )
			assert.equal( popupElement.innerHTML, 'Hello World' )
			assert( onShowCallback.called )
		} )

		test( 'hides the popup when trigger the hide event', () => {
			popup.hide()
			assert.equal( popupElement.style.visibility, 'hidden' )
			assert( onHideCallback.called )
		} )
	} )
} )
