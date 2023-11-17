import assert from 'assert'
import sinon from 'sinon'
import { describe, test, beforeAll } from 'vitest'
import { createTouchPopup } from '../src/touchPopup'
import { JSDOM } from 'jsdom'

describe( 'createTouchPopup', () => {
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
		popup = createTouchPopup( doc.querySelector( '.popup-container' ), dom.window )
		popup.subscribe( { onShow: onShowCallback, onHide: onHideCallback } )
		popupElement = doc.querySelector( '.wp-touch-popup' )
	} )

	test( 'adds a hidden popup to the dom', () => {
		assert.equal( popupElement.style.visibility, 'hidden' )
	} )

	test( 'shows content with background screen', () => {
		popup.show( 'Hello World' )
		assert.equal( popupElement.style.visibility, 'visible' )
		assert.equal( popupElement.innerHTML, 'Hello World' )
		assert( onShowCallback.called )

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		assert.ok( backgroundScreen )
	} )

	test( 'hides the popup and removes background screen when hide event is triggered', () => {
		popup.hide()
		assert.equal( popupElement.style.visibility, 'hidden' )
		assert( onHideCallback.called )

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		assert.ifError( backgroundScreen )
	} )
} )
