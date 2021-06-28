import { Preview } from '../page-objects/preview'
import { Check } from '../page-objects/check'

const preview = new Preview()
const check = new Check()

describe( 'Check the Hover and Click Event', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/english.html' )
	} )

	it( 'Check the Preview by hovering over the Span and click Close', () => {

		preview.getPreviewSpan().first().trigger( 'mouseenter', 'right' )

		check.preview()

		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Preview by Clicking over the Span and click Close', () => {

		preview.getPreviewSpan().first().click()

		check.preview()

		preview.getHeaderClosebtn().click()

	} )

} )
