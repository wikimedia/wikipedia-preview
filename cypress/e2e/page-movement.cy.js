import { Preview } from '../page-objects/preview-page'

const preview = new Preview()

describe( 'Check Page Movement ', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToTestPage()
	} )

	it( 'Check the Read More link in Wikipedia Preview', () => {
		preview.getPreviewSpan().eq( 0 ).click()

		// Open the Wikipedia Page in the same window
		preview.getFooterReadMore().should( ( $a ) => {
			expect( $a.attr( 'target' ), 'target' ).to.equal( '_blank' )
			$a.attr( 'target', '_self' )
		} ).click()

		// Page should contain wikipedia.org
		cy.url().should( 'include', 'wikipedia.org' )

		// Return to the same page
		cy.go( 'back' )

		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()
	} )

	it( 'Check the Reloading of the page', () => {
		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()

		cy.reload()

		// Check for the Preview
		preview.getPreviewSpan().eq( 0 ).click()
		preview.checkPreview()
	} )
} )
