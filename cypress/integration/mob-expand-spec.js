import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'
import { goOffline, goOnline, changeOnline } from '../plugins/network'

const preview = new Preview()

describe( 'Check the onShow, onHide and onExpand functiom', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToMobileHomePage( '/articles/test.html' )
        cy.viewport(550, 750)
	} )

    it( 'Check the Wikipedia Preview in Expanded Layout by Swiping', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 0 ).click()

        // Swipe Up to generate Expanded Mode
        preview.getBody().swipe('bottom','top')
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )
        .and( 'have.class', 'expanded')

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getBody().should( 'be.visible' )
        preview.getBodyContent().should('have.css', 'font-size' ).and( 'equal', '18px' )

        preview.getHeaderImage().its('length').then( len => {
            if(len>0){
               preview.getBodyGallery().scrollIntoView().should('be.visible')
               preview.getBodyGalleryImages().should('be.visible')
            }
        })

        preview.getFooter().should( 'be.visible' )
        preview.getFooterReadMore().should( 'be.visible' )
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )
    
    it( 'Check the Wikipedia Preview in Expanded Layout by Click on Continue Reading', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 0 ).click()

        // Click on Continue Reading Up to generate Expanded Mode
        preview.getFooterContiReading().click()        
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )
        .and( 'have.class', 'expanded' )

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getBody().should( 'be.visible' )
        preview.getBodyContent().should('have.css', 'font-size' ).and( 'equal', '18px' )

        preview.getFooter().should( 'be.visible' )
        preview.getFooterReadMore().should( 'be.visible' )
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )
  

} )
