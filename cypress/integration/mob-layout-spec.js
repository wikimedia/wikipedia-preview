import { Preview } from '../page-objects/preview'
import { goOffline, goOnline } from '../plugins/network'

const preview = new Preview()

describe( 'Check the onShow, onHide and onExpand functiom', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToMobileHomePage( '/articles/test.html' )
        cy.viewport(550, 750)
	} )

    it( 'Check the Wikipedia Preview in Standard Layout', () => {
        // Opens Mobile Preview
		preview.getPreviewSpan().eq( 0 ).click()
        // Checks the preview
        check.mobilePreview()
        check.previewStandard()
        // Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

    it( 'Check the Wikipedia Preview in Expanded Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 0 ).click()
        // Swipe Up to generate Expanded Mode
        preview.getBody().swipe('bottom','top')
        // Checks the preview
        check.mobilePreview()
        check.previewExpanded()
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )
	

    it.skip( 'Check the Wikipedia Preview in Offline Layout', () => {
        goOffline()
        // Opens Mobile Preview
        preview.getPreviewSpan().first().click()
        // Checks the preview
        check.mobilePreview()
        check.previewOffline()
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()
        goOnline()

    } )

    it( 'Check the Wikipedia Preview in Error Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 1 ).click()
        // Checks the preview
        check.mobilePreview()
        check.previewError()
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )

    it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 2 ).click()
        // Checks the preview
        check.mobilePreview()
        check.previewDisambiguation()
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )
} )
