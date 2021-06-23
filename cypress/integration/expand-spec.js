import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'

const preview = new Preview()

describe( 'Check the onShow, onHide and onExpand functiom', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it( 'Check the Wikipedia Preview in Expanded Layout', () => {
		// Opening the Expanded Mode
		preview.getPreviewSpan().eq( 0 ).click()

		cy.wait( 1500 )
		preview.getFooterContiReading().click()

		cy.CheckPreviewExpanded()

		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Wikipedia Preview appears in Standard Layout after being in expanded Mode ', () => {

		// Opening the Expanded Mode
		preview.getPreviewSpan().eq( 0 ).click()
		cy.wait( 1500 )
		preview.getFooterContiReading().click()
		preview.getHeaderClosebtn().click()

		preview.getPreviewSpan().eq( 0 ).click()
		cy.wait( 1500 )
		preview.getFooterContiReading().click()

		cy.CheckPreviewExpanded()

		preview.getHeaderClosebtn().click()

	} )


} )