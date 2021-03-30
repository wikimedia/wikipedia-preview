describe('Testing french article', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/french.html').url().should('include', '/french.html')  
    })


    it('Popup résolutions', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'résolutions').click()
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'Continuer à lire').click()        
        cy.goToWiki().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup droit de veto', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span').should('have.text', 'droit de veto').click({force:true})
        cy.getPopup().should('be.visible') 
        cy.goToWiki().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

})

describe('Testing french article for phone', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/french.html').url().should('include', '/french.html')
        cy.viewport('samsung-s10')  
    })


    it('Popup résolutions', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'résolutions').click()
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'Continuer à lire').click()        
        cy.goToWiki().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup droit de veto', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span').should('have.text', 'droit de veto').click({force:true})
        cy.getPopup().should('be.visible') 
        cy.goToWiki().should('be.visible').should('have.text', 'Lire davantage sur Wikipédia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

})