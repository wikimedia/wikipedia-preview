import { Preview } from '../../page-objects/preview'
import { msg } from '../../../src/i18n'

const preview = new Preview()


describe('Check the layout', () => {
    
    beforeEach('Open the English Page', () => {
        cy.navigateToHomePage('/articles/english.html')
        cy.wait(2000)
    })

    
    it.skip('Check the span should have the classname data-wikipedia-preview', () => {
        preview.PreviewSpan().should('have.attr','data-wikipedia-preview')
    })


    it('Check the Wikipedia Preview in Offline Layout', () => {
        preview.PreviewSpan().first().click()
        cy.wait(2000)

        preview.Header().should('be.visible')
        preview.HeaderWatermark().should('be.visible')
        preview.HeaderClosebtn().should('be.visible')

        preview.Preview().then( tag => {
            const lang = tag.attr('lang')

            preview.Body().should('be.visible')
            .and('have.class','wikipediapreview-body-offline')
            .and('have.css','font-size').and('equal','16px')

            preview.BodyMessage().then( tag => {
                cy.wrap(tag).find('div.wikipediapreview-body-icon')
                cy.wrap(tag).find('span').should('contain',msg( lang, 'preview-offline-message' ))

            })

            preview.BodyAction().should('be.visible')
            .and('contain',msg( lang, 'preview-offline-cta' ))


        })
        
    })


    it.skip('Check the Wikipedia Preview in Error Layout', () => {
        preview.PreviewSpan().first().click()
        cy.wait(2000)

        preview.Header().should('be.visible')
        preview.HeaderWatermark().should('be.visible')
        preview.HeaderClosebtn().should('be.visible')

        preview.Preview().then( tag => {

            const lang = tag.attr('lang')

            cy.log(lang)

            preview.Body().should('be.visible')
            .and('have.class','wikipediapreview-body-error')
            .and('have.css','font-size').and('equal','16px')

            preview.BodyMessage().then( tag => {
                cy.wrap(tag).find('div.wikipediapreview-body-icon')
                cy.wrap(tag).find('span').should('contain',msg( lang, 'preview-error-message' ))

            })

            preview.BodyAction().should('be.visible')
            .and('contain',msg( lang, 'read-on-wiki' ))

        })

    })

    it.skip('Check the Wikipedia Preview in Disambiguation Layout', () => {
        preview.PreviewSpan().first().click()
        cy.wait(2000)

        preview.Header().should('be.visible')
        preview.HeaderWatermark().should('be.visible')
        preview.HeaderClosebtn().should('be.visible')

        preview.Preview().then( tag => {

            const lang = tag.attr('lang')

            cy.log(lang)

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

    

})

