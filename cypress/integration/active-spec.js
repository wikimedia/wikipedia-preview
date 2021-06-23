import { Preview } from '../page-objects/preview'

const preview = new Preview()

describe( 'Check the Hover and Click Event', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/english.html' )
	} )

	it( 'Check the Preview by hovering over the Span', () => {

		preview.getPreviewSpan().first().trigger( 'mouseenter' )

		cy.CheckPreview()

		preview.getPreview().invoke( 'hide' )

	} )

	it( 'Check the Preview by hovering over the Span and click Close', () => {

		preview.getPreviewSpan().first().trigger( 'mouseenter', 'right' )

		cy.CheckPreview()

		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Preview by Clicking over the Span', () => {

		preview.getPreviewSpan().first().click()

		cy.CheckPreview()

		preview.getPreview().invoke( 'hide' )

	} )

	it( 'Check the Preview by Clicking over the Span and click Close', () => {

		preview.getPreviewSpan().first().click()

		cy.CheckPreview()

		preview.getHeaderClosebtn().click()

	} )

} )
