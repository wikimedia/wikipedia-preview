import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'
import { goOffline, goOnline, changeOnline } from '../plugins/network'

const preview = new Preview()

describe( 'Check the onShow, onHide and onExpand functiom', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToMobileHomePage( '/articles/test.html' )
        cy.viewport(550, 750)
	} )

    it( 'Check the span should have the classname data-wikipedia-preview', () => {
        preview.getPreviewSpan().should( 'have.attr', 'data-wikipedia-preview' )
    } )

	it( 'Check the Wikipedia Preview in Standard Layout', () => {

        // Opens Mobile Preview
		preview.getPreviewSpan().eq( 0 ).click()
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderImage().should( 'be.visible')
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getMobBackgroundScreen().should('be.visible')
        preview.getBody().should( 'be.visible' )
        preview.getBodyContent()
            .should( 'have.css', 'font-size' ).and( 'equal', '18px' )

        preview.getFooter().should( 'be.visible')
        preview.getFooterContiReading().should( 'be.visible' )
        // Closes the Mobile Preview
		preview.getHeaderClosebtn().click()

	} )

    it( 'Check the Wikipedia Preview in Expanded Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 0 ).click()
        // Swipe Up to generate Expanded Mode
        preview.getBody().swipe('bottom','top')
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
	

    it( 'Check the Wikipedia Preview in Offline Layout', () => {
        goOffline()
        // Opens Mobile Preview
        preview.getPreviewSpan().first().click()
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getMobPreview().then( tag => {

            const lang = tag.attr( 'lang' )

            preview.getBody().should( 'be.visible' )
                .and( 'have.class', 'wikipediapreview-body-disambiguation' )
                .and( 'have.css', 'font-size' ).and( 'equal', '16px' )

            preview.getBodyMessage().then( tag => {
                cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' ).should( 'be.visible' )
                cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-offline-message' ) )

            } )

            preview.getBodyAction().should( 'be.visible' )
                .and( 'contain', msg( lang, 'preview-offline-cta' ) )

        } )
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()
        goOnline()

    } )

    it( 'Check the Wikipedia Preview in Error Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 1 ).click()
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getMobPreview().then( tag => {

            const lang = tag.attr( 'lang' )

            preview.getBody().should( 'be.visible' )
                .and( 'have.class', 'wikipediapreview-body-error' )
                .and( 'have.css', 'font-size' ).and( 'equal', '16px' )

            preview.getBodyMessage().then( tag => {
                cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
                cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-error-message' ) )

            } )

            preview.getBodyAction().should( 'be.visible' )
                .should( 'contain', msg( lang, 'read-on-wiki' ) )

        } )
        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )

    it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
        // Opens Mobile Preview
        preview.getPreviewSpan().eq( 2 ).click()
        // Checks the preview
        preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )

        preview.getHeader().should( 'be.visible' )
        preview.getHeaderWatermark().should( 'be.visible' )
        preview.getHeaderClosebtn().should( 'be.visible' )

        preview.getMobPreview().then( tag => {

            const lang = tag.attr( 'lang' )

            preview.getBody().should( 'be.visible' )
                .and( 'have.class', 'wikipediapreview-body-disambiguation' )
                .and( 'have.css', 'font-size' ).and( 'equal', '16px' )

            preview.getBodyMessage().then( tag => {
                cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
            } )

            preview.getBodyAction().should( 'be.visible' )
                .and( 'contain', msg( lang, 'read-on-wiki' ) )
        } )

        // Closes the Mobile Preview
        preview.getHeaderClosebtn().click()

    } )
} )
