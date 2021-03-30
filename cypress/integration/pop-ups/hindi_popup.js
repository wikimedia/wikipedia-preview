describe('Testing Hindi article', () => {
    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/hindi.html')
    })

    it('Popup मन्दिर', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'मन्दिर').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'पढ़ना जारी रखें').click()     
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click({force:true})  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup हुमांयू', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'हुमांयू').click({force:true})
        cy.getPopup().should('be.visible')  
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup अंकगणितीय', () => {
        cy.get('body > div.container > div.content > p:nth-child(4) > span').should('have.text', 'अंकगणितीय').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'पढ़ना जारी रखें').click()      
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })


})

describe('Testing Hindi article for phone', () => {
    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/hindi.html')
        cy.viewport('samsung-s10')
    })

    it('Popup मन्दिर', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'मन्दिर').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'पढ़ना जारी रखें').click()     
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click({force:true})  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup हुमांयू', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'हुमांयू').click({force:true})
        cy.getPopup().should('be.visible')  
        cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup अंकगणितीय', () => {
        cy.get('body > div.container > div.content > p:nth-child(4) > span').should('have.text', 'अंकगणितीय').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'पढ़ना जारी रखें').click()      
        cy.goToWiki().should('be.visible').should('have.text', 'विकिपीडिया पर अधिक पढ़ें').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })


})