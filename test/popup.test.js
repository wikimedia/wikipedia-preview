import { describe, test, beforeAll, expect, vi } from 'vitest'
import { computePopupPosition, createPopup } from '../src/components/popup.js'
import { JSDOM } from 'jsdom'

describe.skip( 'Popup', () => {
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
			test( 'is under the target', () => expect( position.top ).toBe( 75 ) )
			test( 'is left-aligned', () => expect( position.left ).toBe( 60 ) )
			test( 'does not specify bottom', () => expect( position.bottom ).toBe( '' ) )
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
			test( 'is under the target', () => expect( position.top ).toBe( 75 ) )
			test( 'is right-aligned', () => expect( position.left ).toBe( 350 ) )
			test( 'does not specify bottom', () => expect( position.bottom ).toBe( '' ) )
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
			test( 'is over the target', () => expect( position.bottom ).toBe( 90 ) )
			test( 'is left-aligned', () => expect( position.left ).toBe( 70 ) )
			test( 'does not specify top', () => expect( position.top ).toBe( '' ) )
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
			test( 'is over the target', () => expect( position.bottom ).toBe( 90 ) )
			test( 'is right-aligned', () => expect( position.left ).toBe( 390 ) )
			test( 'does not specify top', () => expect( position.top ).toBe( '' ) )
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
			test( 'is under the target', () => expect( position.top ).toBe( 75 ) )
			test( 'is left-aligned', () => expect( position.left ).toBe( 60 ) )
			test( 'does not specify bottom', () => expect( position.bottom ).toBe( '' ) )
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
			test( 'is over the target', () => expect( position.bottom ).toBe( 90 ) )
			test( 'is left-aligned', () => expect( position.left ).toBe( 70 ) )
			test( 'does not specify top', () => expect( position.top ).toBe( '' ) )
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
			test( 'is over the target', () => expect( position.bottom ).toBe( 90 ) )
			test( 'is right-aligned', () => expect( position.left ).toBe( 390 ) )
			test( 'does not specify top', () => expect( position.top ).toBe( '' ) )
		}
		)

	} )

	describe( 'createPopup', () => {
		const onShowCallback = vi.fn(),
			onHideCallback = vi.fn()

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
			expect( popupElement.style.visibility ).toBe( 'hidden' )
		} )

		test( 'shows content next to a target', () => {
			const target = dom.window.document.querySelector( '.target' )
			popup.show( 'Hello World', target, { x: 1, y: 1 } )
			expect( popupElement.style.visibility ).toBe( 'visible' )
			expect( popupElement.innerHTML ).toBe( 'Hello World' )
			expect( onShowCallback ).toHaveBeenCalled()
		} )

		test( 'hides the popup when trigger the hide event', () => {
			popup.hide()
			expect( popupElement.style.visibility ).toBe( 'hidden' )
			expect( onHideCallback ).toHaveBeenCalled()
		} )
	} )
} )
