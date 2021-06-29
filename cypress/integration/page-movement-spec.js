import { Preview } from '../page-objects/preview-page'

const preview = new Preview()

describe( 'Check Page Movement ', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it( 'Check the Read More link in Wikipedia Preview', () => {

		preview.getPreviewSpan().eq( 0 ).click()

		// Continue Reading is available
		preview.getFooterContiReading().its( 'length' ).then( res => {
			if ( res > 0 ) { preview.getFooterContiReading().click() }
		} )

		// Open the Wikipedia Page in the same window
		preview.getFooterReadMore().invoke( 'removeAttr', 'target' )
		preview.getFooterReadMore().click()

		// Page should contain wikipedia.org
		cy.url().should( 'include', 'wikipedia.org' )

		// Return to the same page
		cy.go( 'back' )

		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()
		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Reloading of the page', () => {

		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()

		cy.reload()

		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()
		preview.getHeaderClosebtn().click()

	} )
} )
