import { Preview } from '../page-objects/preview'

const preview = new Preview()

describe( 'Check the Expnaded Layout', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it( 'Check the Wikipedia Preview in Expanded Layout', () => {
		// Opens the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		// Click on Continue Reading Footer element
		preview.getFooterContiReading().click()
		// Check the Expanded Mode preview
        preview.checkPreviewExpanded()
        // Closes the Preview
		preview.getHeaderClosebtn().click()

	} )

} )
