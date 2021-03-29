/// <reference types="Cypress" />

describe('Testing Bahasa Indonesia version for Mobileview', () => {
    
    beforeEach(() => { 
        cy.viewport('iphone-xr')
    })
    
    it('Check URL', () => {
        cy.visit('http://localhost:8080/articles/bahasaIndonesia.html').url().should('include', '/bahasaIndonesia.html')
    })

    it('Check Header', () => {
        cy.pageHeader().should('be.visible').should('have.text', 'Wikipedia Preview demo') 
    })

    it('Check Header Font-Size', () => {
        cy.pageHeader().should('be.visible').should('have.css', 'font-size', '18px')
    })

    it('Check Image Rendering', () => {
        cy.coverImage().should('be.visible') 
    })

    it('Check Title', () => {
        cy.titleCheck().should('have.text', 'Gili Trawangan') 
    })

    it('Check Content', () => {
        cy.para1().should('be.visible')  
        cy.para2().should('be.visible')  
    })

    it('Check Content Font-Size', () => {
        cy.para1().should('have.css', 'font-size', '16px') 
        cy.para2().should('have.css', 'font-size', '16px')  
    })

    // it('Check Span Lombok', () => {        ******Bug to be Reported*******
    //     cy.get('body > div.container > div.content > p:nth-child(1) > a').should('have.text', 'Lombok') 
    //     cy.get('body > div.wp-popup > div').should('be.visible')
    //    cy.previewBoxHeaderImg().should('be.visible')  
    // })

    it('Check Span Gili Meno', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'Gili Meno').click({force:true})
        cy.previewBox().should('be.visible')
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'Lanjutkan Membaca').click()
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.previewBoxFooterImg3().should('be.visible')    
        cy.readMoreBtn().should('be.visible').should('have.text', 'Baca lebih lanjut tentang Wikipedia').click()  
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