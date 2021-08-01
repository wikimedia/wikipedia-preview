import { Preview } from '../page-objects/preview-page'

const preview = new Preview()

describe( 'Check the Expanded Layout in Mobile View', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToMobileTestPage()
	} )

	it( 'Check the Wikipedia Preview in Expanded Layout by Swiping', () => {
		// Opens Mobile Preview
		preview.getPreviewSpan().eq( 0 ).click()
		// Swipe Up to generate Expanded Mode
		preview.getBody().swipe( 'bottom', 'top' )
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreviewExpanded()
		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Wikipedia Preview in Expanded Layout by Click on Continue Reading', () => {
		// Opens Mobile Preview
		preview.getPreviewSpan().eq( 0 ).click()
		// Click on Continue Reading Up to generate Expanded Mode
		preview.getFooterContinueReading().click()
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreviewExpanded()
		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

} )
