import { Preview } from '../../page-objects/preview'

const preview = new Preview()


describe('Check the Hover and Click Event', () => {
    
    beforeEach('Open the English Page', () => {
        cy.navigateToHomePage('/articles/english.html')
        cy.wait(2000)
    })

    
    it('Check the Preview by hovering over the Span', () => {

        preview.PreviewSpan().first().trigger('mouseenter')
        cy.wait(2000)

        cy.CheckPreview()

        preview.Preview().invoke('hide')
        cy.wait(2000)
    
    })


    it('Check the Preview by hovering over the Span and click Close', () => {

        preview.PreviewSpan().first().trigger('mouseenter','left')
        cy.wait(2000)

        cy.CheckPreview()

        preview.HeaderClosebtn().click()
        cy.wait(2000)

    })

    it('Check the Preview by Clicking over the Span', () => {

        preview.PreviewSpan().first().click()
        cy.wait(2000)

        cy.CheckPreview()

        preview.Preview().invoke('hide')
        cy.wait(2000)
    
    })


    it('Check the Preview by Clicking over the Span and click Close', () => {

        preview.PreviewSpan().first().click()
        cy.wait(2000)

        cy.CheckPreview()

        preview.HeaderClosebtn().click()
        cy.wait(2000)

    })  

    

})

