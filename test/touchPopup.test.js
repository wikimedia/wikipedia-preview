'use strict'
const assert = require( 'assert' )
const sinon = require( 'sinon' )
const { createTouchPopup } = require( '../src/touchPopup' )
const { JSDOM } = require( 'jsdom' )

describe( 'createTouchPopup', () => {
	/* eslint-disable mocha/no-setup-in-describe */
	const onShowCallback = sinon.spy(),
		onHideCallback = sinon.spy()
	/* eslint-enable mocha/no-setup-in-describe */

	let dom,
		popup,
		popupElement

	before( () => {
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

	it( 'adds a hidden popup to the dom', () => {
		assert.equal( popupElement.style.visibility, 'hidden' )
	} )

	it( 'shows content with background screen', () => {
		popup.show( 'Hello World' )
		assert.equal( popupElement.style.visibility, 'visible' )
		assert.equal( popupElement.innerHTML, 'Hello World' )
		assert( onShowCallback.called )

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		assert.ok( backgroundScreen )
	} )

	it( 'hides the popup and removes background screen when hide event is triggered', () => {
		popup.hide()
		assert.equal( popupElement.style.visibility, 'hidden' )
		assert( onHideCallback.called )

		const backgroundScreen = dom.window.document.querySelector( '.wp-dark-screen' )
		assert.ifError( backgroundScreen )
	} )
} )
