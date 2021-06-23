import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'

const preview = new Preview()

Cypress.Commands.add( 'navigateToHomePage', ( url = '' ) => {
	cy.visit( String( url ) )
} )

Cypress.Commands.add( 'navigateToMobileHomePage', ( url = '' ) => {
    cy.visitMobile(String( url ))
} )

// Custom Command to check the existence of Preview
Cypress.Commands.add( 'CheckPreview', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getBody().should( 'be.visible' )

} )

// Custom Command to check the Preview in Standard With Image Mode
Cypress.Commands.add( 'CheckPreviewStandardWithImage', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderImage().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getBody().should( 'be.visible' )
	preview.getBodyContent().should( 'be.visible' )
		.and( 'have.css', 'font-size' ).and( 'equal', '18px' )

	preview.getFooter().should( 'be.visible' )
	preview.getFooterContiReading().should( 'be.visible' )

} )

// Custom Command to check the Preview in Standard Without Image Mode
Cypress.Commands.add( 'CheckPreviewStandardWithoutImage', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getBody().should( 'be.visible' )
	preview.getBodyContent().should( 'be.visible' )
		.and( 'have.css', 'font-size' ).and( 'equal', '18px' )

	preview.getFooter().should( 'be.visible' )
	preview.getFooterContiReading().should( 'be.visible' )

} )

// Custom Command to check the Preview in Standard Without Image Mode
Cypress.Commands.add( 'CheckPreviewExpanded', () =>{

	preview.getPreview().should( 'be.visible' )
		.and( 'have.class', 'expanded' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getBody().should( 'be.visible' )
	preview.getBodyContent().should( 'be.visible' )
		.and( 'have.css', 'font-size' ).and( 'equal', '18px' )
	preview.getHeaderImage().its('length').then( len => {
        if(len>0){
           preview.getBodyGallery().scrollIntoView().should('be.visible')
           preview.getBodyGalleryImages().should('be.visible')
        }
    })
	preview.getFooter().should( 'be.visible' )
	preview.getFooterReadMore().should( 'be.visible' )

} )

// Custom Command to check the Preview in Disambiguation Mode
Cypress.Commands.add( 'CheckPreviewDisambiguation', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getPreview().then( tag => {

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

} )

// Custom Command to check the Preview in Offline Mode
Cypress.Commands.add( 'CheckPreviewOffline', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getPreview().then( tag => {

		const lang = tag.attr( 'lang' )

		preview.getBody().should( 'be.visible' )
			.and( 'have.class', 'wikipediapreview-body-error' )
			.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

		preview.getBodyMessage().then( tag => {
			cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' ).should( 'be.visible' )
			cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-offline-message' ) )

		} )

		preview.getBodyAction().should( 'be.visible' )
			.and( 'contain', msg( lang, 'preview-offline-cta' ) )

	} )

} )

// Custom Command to check the Preview in Error Mode
Cypress.Commands.add( 'CheckPreviewError', () =>{

	preview.getPreview().should( 'be.visible' )

	preview.getHeader().should( 'be.visible' )
	preview.getHeaderWatermark().should( 'be.visible' )
	preview.getHeaderClosebtn().should( 'be.visible' )

	preview.getPreview().then( tag => {

		const lang = tag.attr( 'lang' )

		preview.getBody().should( 'be.visible' )
			.and( 'have.class', 'wikipediapreview-body-disambiguation' )
			.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

		preview.getBodyMessage().then( tag => {
			cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
			cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-error-message' ) )

		} )

		preview.getBodyAction().should( 'be.visible' )
			.should( 'contain', msg( lang, 'read-on-wiki' ) )

	} )

} )
