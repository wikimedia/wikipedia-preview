import { describe, test, beforeAll, expect, vi } from 'vitest'
import { createTouchPopup } from '../src/touchPopup.js'
import { JSDOM } from 'jsdom'

describe( 'createTouchPopup', () => {
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
		popup = createTouchPopup( doc.querySelector( '.popup-container' ), dom.window )
		popup.subscribe( { onShow: onShowCallback, onHide: onHideCallback } )
		popupElement = doc.querySelector( '.wp-touch-popup' )
	} )

	test( 'adds a hidden popup to the dom', () => {
		expect( popupElement.style.visibility ).toBe( 'hidden' )
	} )

	test( 'shows content with background screen', () => {
		popup.show( 'Hello World' )
		expect( popupElement.style.visibility ).toBe( 'visible' )
		expect( popupElement.innerHTML ).toBe( 'Hello World' )
		expect( onShowCallback ).toHaveBeenCalled()

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		expect( backgroundScreen ).toBeTruthy()
	} )

	test( 'hides the popup and removes background screen when hide event is triggered', () => {
		popup.hide()
		expect( popupElement.style.visibility ).toBe( 'hidden' )
		expect( onHideCallback ).toHaveBeenCalled()

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		expect( backgroundScreen ).toBeFalsy()
	} )
} )
