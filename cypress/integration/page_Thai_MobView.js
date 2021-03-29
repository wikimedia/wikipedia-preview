/// <reference types="Cypress" />

describe('Testing Thai version for Mobileview', () => {

    beforeEach(() => { 
        cy.viewport('iphone-xr')
    })

    it('Check URL', () => {
        cy.visit('http://localhost:8080/articles/thai.html').url().should('include', '/thai.html')  
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
        cy.titleCheck().should('have.text', 'เฉลิมชัย โฆษิตพิพัฒน์') 
    })

    it('Check Content', () => {
        cy.para1().should('be.visible')  
        cy.para2().should('be.visible')  
    })

    it('Check Content Font-Size', () => {
        cy.para1().should('have.css', 'font-size', '16px')  
        cy.para2().should('have.css', 'font-size', '16px')  
    })

    it('Check Span พระมหาชนก', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'พระมหาชนก').click()
        cy.previewBox().should('be.visible') 
        cy.previewBoxHeaderImg().should('be.visible')  
        cy.continueReadBtn().should('have.text', 'อ่านต่อ').click()     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.previewBoxFooterImg2().should('be.visible')    
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible')  
    })

    it('Check Span วัดร่องขุ่น', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'วัดร่องขุ่น').click({force:true})
        cy.previewBox().should('be.visible') 
        cy.get('body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-image').should('be.visible')  
        cy.continueReadBtn().should('have.text', 'อ่านต่อ').click({force:true})     
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click() 
        cy.previewBoxCloseBtn().click()  
        cy.previewBox().should('not.be.visible') 
    })

    it('Check Span จังหวัดเชียงราย', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'จังหวัดเชียงราย').click({ force: true })
        cy.previewBox().should('be.visible') 
        cy.get('body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-image').should('be.visible')  
        cy.continueReadBtn().should('have.text', 'อ่านต่อ').click()     
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(1)').scrollIntoView().should('be.visible')  
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(2)').should('be.visible')    
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(3)').should('be.visible')    
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
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