import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'

const preview = new Preview()

Cypress.Commands.add('navigateToHomePage', (url='') => {
  cy.visit(''+url)
})


// Custom Command to check the existence of Preview
Cypress.Commands.add('CheckPreview' , () =>{

    preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Body ().should('be.visible')

})

// Custom Command to check the Preview in Standard With Image Mode
Cypress.Commands.add('CheckPreviewStandardWithImage' , () =>{

    preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderImage().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Body ().should('be.visible')
    preview.BodyContent().should('be.visible')
    .and('have.css','font-size').and('equal','18px')

    preview.Footer().should('be.visible')
    preview.FooterContiReading().should('be.visible')

})

// Custom Command to check the Preview in Standard Without Image Mode
Cypress.Commands.add('CheckPreviewStandardWithoutImage' , () =>{

    preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Body ().should('be.visible')
    preview.BodyContent().should('be.visible')
    .and('have.css','font-size').and('equal','18px')

    preview.Footer().should('be.visible')
    preview.FooterContiReading().should('be.visible')

})

// Custom Command to check the Preview in Disambiguation Mode
Cypress.Commands.add('CheckPreviewDisambiguation' , () =>{

    preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Preview().then( tag => {

        const lang = tag.attr('lang')

        preview.Body().should('be.visible')
        .and('have.class','wikipediapreview-body-disambiguation')
        .and('have.css','font-size').and('equal','16px')

        preview.BodyMessage().then( tag => {
            cy.wrap(tag).find('div.wikipediapreview-body-icon')
        })

        preview.BodyAction().should('be.visible')
        .and('contain',msg( lang, 'read-on-wiki' ))
    })

})

// Custom Command to check the Preview in Offline Mode
Cypress.Commands.add('CheckPreviewOffline' , () =>{

	preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Preview().then( tag => {

        const lang = tag.attr('lang')

        preview.Body().should('be.visible')
        .and('have.class','wikipediapreview-body-disambiguation')
        .and('have.css','font-size').and('equal','16px')

        preview.BodyMessage().then( tag => {
            cy.wrap(tag).find('div.wikipediapreview-body-icon').should('be.visible')
            cy.wrap(tag).find('span').should('contain',msg( lang, 'preview-offline-message' ))

        })

        preview.BodyAction().should('be.visible')
        .and('contain',msg( lang, 'preview-offline-cta' ))


    })

})

// Custom Command to check the Preview in Error Mode
Cypress.Commands.add('CheckPreviewError' , () =>{

	preview.Preview().should('be.visible')

    preview.Header().should('be.visible')
    preview.HeaderWatermark().should('be.visible')
    preview.HeaderClosebtn().should('be.visible')

    preview.Preview().then( tag => {

        const lang = tag.attr('lang')

        preview.Body().should('be.visible')
        .and('have.class','wikipediapreview-body-disambiguation')
        .and('have.css','font-size').and('equal','16px')

        preview.BodyMessage().then( tag => {
            cy.wrap(tag).find('div.wikipediapreview-body-icon')
            cy.wrap(tag).find('span').should('contain',msg( lang, 'preview-error-message' ))

        })

        preview.BodyAction().should('be.visible')
        .should('contain',msg( lang, 'read-on-wiki' ))


    })

})

