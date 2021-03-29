/// <reference types="Cypress" />

describe('Testing Arabic version for MobileView', () => {

    beforeEach(() => { 
        cy.viewport('iphone-xr')
    })

    it('Check URL', () => {
        cy.visit('http://localhost:8080/articles/arabic.html').url().should('include', '/arabic.html') 
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
        cy.titleCheck().should('have.text', 'أم كلثوم (مطربة)') 
    })

    it('Check Content', () => {
        cy.para1().should('be.visible')  
        cy.para2().should('be.visible')  
    })

    it('Check Content Font-Size', () => {
        cy.para1().should('have.css', 'font-size', '16px')  
        cy.para2().should('have.css', 'font-size', '16px') 
    })

    it('Check Span القاهرة', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'القاهرة').click({ force: true })
        cy.previewBox().should('be.visible') 
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'مواصلة القراءة').click()     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.previewBoxFooterImg3().should('be.visible')     
        cy.readMoreBtn().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible')  
    })

    it('Check Span مصر', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'مصر').click({ force: true })
        cy.previewBox().should('be.visible') 
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'مواصلة القراءة').click()     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible') 
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.previewBoxFooterImg3().should('be.visible')     
        cy.readMoreBtn().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible')  
    })

    it('Check Span محمد_عبد_الوهاب ', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'محمد_عبد_الوهاب').click({ force: true })
        cy.previewBox().should('be.visible') 
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'مواصلة القراءة').click()     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.previewBoxFooterImg3().should('be.visible')     
        cy.readMoreBtn().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click() 
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