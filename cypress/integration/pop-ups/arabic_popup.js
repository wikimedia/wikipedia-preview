// You can find these  custom methods in cypress/support/commands.js


describe('Testing arabic page popup', () => {

    it('Visit arabic pa URL', () => {
        cy.visit('http://localhost:8080/articles/arabic.html')
    })

    it('Popup القاهرة', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'القاهرة').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click({force:true})        
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup مصر', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'مصر').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click()         
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup محمد_عبد_الوهاب ', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'محمد_عبد_الوهاب').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click()         
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

})

describe('Testing arabic page popup for phone', () => {

    it('Visit arabic pa URL', () => {
        cy.visit('http://localhost:8080/articles/arabic.html')
        cy.viewport('samsung-s10')
    })

    it('Popup القاهرة', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'القاهرة').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click({force:true})        
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup مصر', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'مصر').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click()         
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup محمد_عبد_الوهاب ', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'محمد_عبد_الوهاب').click({ force: true })
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'مواصلة القراءة').click()         
        cy.goToWiki().should('be.visible').should('have.text', 'اقرأ المزيد عن ويكيبيديا').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

})