import { Preview } from '../page-objects/preview-page'
import { goOffline, goOnline } from '../helpers/network'

const preview = new Preview()

describe( 'Check the different Layout in Mobile Wikipedia Preview ', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToMobileTestPage()
	} )

	it( 'Check the Wikipedia Preview in Standard Layout', () => {
		// Opens Mobile Preview
		preview.getPreviewSpan().eq( 0 ).trigger( 'pointerenter', { pointerType: 'touch' } )
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreview()
		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

	it.skip( 'Check the Wikipedia Preview in Offline Layout', () => {
		goOffline()
		// Opens Mobile Preview
		preview.getPreviewSpan().first().trigger( 'pointerenter', { pointerType: 'touch' } )
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreviewOffline()
		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()
		goOnline()

	} )

	it( 'Check the Wikipedia Preview in Error Layout', () => {
		// Opens Mobile Preview
		preview.getPreviewSpan().eq( 1 ).trigger( 'pointerenter', { pointerType: 'touch' } )
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreviewError()
		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
		// Opens Mobile Preview
		preview.getPreviewSpan().eq( 2 ).trigger( 'pointerenter', { pointerType: 'touch' } )
		// Checks the preview
		preview.checkMobilePreview()
		preview.checkPreview()

		// add this check back if found a disambiguation page with no extract data
		// preview.checkPreviewDisambiguation()

		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )
} )
