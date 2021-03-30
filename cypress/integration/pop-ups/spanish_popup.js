
describe('Testing Spanish article', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/spanish.html')
    })

    it('Popup motor de corriente alterna', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'motor de corriente alterna').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'Continuar leyendo').click()       
        cy.goToWiki().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup Edison', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'Edison').click({force:true})
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'Continuar leyendo').click()       
        cy.goToWiki().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible') 
    })

    it('Popup Smiljan', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span').should('have.text', 'Smiljan').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })


})


describe('Testing Spanish article for phone', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/spanish.html')
        cy.viewport('samsung-s10')
    })

    it('Popup motor de corriente alterna', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'motor de corriente alterna').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'Continuar leyendo').click()       
        cy.goToWiki().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup Edison', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'Edison').click({force:true})
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'Continuar leyendo').click()       
        cy.goToWiki().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible') 
    })

    it('Popup Smiljan', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span').should('have.text', 'Smiljan').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('be.visible').should('have.text', 'Leer más en Wikipedia').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })


})