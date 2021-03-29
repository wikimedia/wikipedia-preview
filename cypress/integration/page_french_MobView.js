/// <reference types="Cypress" />

describe('Testing French version for MobileView', () => {

    beforeEach(() => { 
        cy.viewport('iphone-xr')
    })
    
    it('Check URL', () => {
        cy.visit('http://localhost:8080/articles/french.html').url().should('include', '/french.html')  
    })

    it('Check Header', () => {
        cy.pageHeader().should('be.visible').should('have.text', 'Wikipedia Preview demo') 
    })

    it('Check Header Font-Size', () => {
        cy.pageHeader().should('be.visible').should('have.css', 'font-size', '18px')    
    })

    it('Check Image Rendering', () => {
        cy.get('body > div.container > div.cover').should('be.visible') 
    })

    it('Check Title', () => {
        cy.titleCheck().should('have.text', 'Conseil de sécurité des Nations unies') 
    })

    it('Check Content', () => {
        cy.para1().should('be.visible')  
        cy.para2().should('be.visible')  
        cy.para3().should('be.visible')  
    })

    it('Check Content Font-Size', () => {
        cy.para1().should('have.css', 'font-size', '16px')  
        cy.para2().should('have.css', 'font-size', '16px') 
        cy.para3().should('have.css', 'font-size', '16px')  
    })

    it('Check Span résolutions', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'résolutions').click()
        cy.previewBox().should('be.visible') 
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'Continuer à lire').click()     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.previewBoxFooterImg3().should('be.visible')     
        cy.readMoreBtn().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible')  
    })

    it('Check Span droit de veto', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span').should('have.text', 'droit de veto').click({force:true})
        cy.previewBox().should('be.visible') 
        cy.readMoreBtn().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible')  
    })

    it('Check Footer', () => {
        cy.pageFooter().should('be.visible')
    })

    it('Check Footer Font-Size', () => {
        cy.get('body > div.footer > p').should('be.visible').should('have.css', 'font-size', '12px')    
    })
})