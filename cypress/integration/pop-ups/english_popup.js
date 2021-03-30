describe('Testing English article', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/english.html') 
    })


    it('Popup Ivory', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'ivory').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'Continue Reading').click()      
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup  Bamingui-Bangoran National', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', ' Bamingui-Bangoran National').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'Continue Reading').click()    
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup Chink Project', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span:nth-child(1)').should('have.text', 'Chinko Project').click({ force: true })
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'Continue Reading').click()   
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup 50', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span:nth-child(2)').scrollIntoView().should('have.text', '50').click({force:true})
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body.wikipediapreview-body-disambiguation').should('be.visible')
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body.wikipediapreview-body-disambiguation > div.wikipediapreview-body-action > a').click()
        cy.closePopup().click()
        cy.getPopup().should('not.be.visible')  
    })



})

describe('Testing English article for phone', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/english.html').url().should('include', '/english.html') 
        cy.viewport('samsung-s10') 
    })


    it('Popup Ivory', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span').should('have.text', 'ivory').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'Continue Reading').click()      
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup  Bamingui-Bangoran National', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', ' Bamingui-Bangoran National').click({force:true})
        cy.getPopup().should('be.visible')   
        cy.continueReading().should('have.text', 'Continue Reading').click()    
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup Chink Project', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span:nth-child(1)').should('have.text', 'Chinko Project').click({ force: true })
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'Continue Reading').click()   
        cy.readMoreBtn().should('be.visible').should('have.text', 'Read more on Wikipedia').click() 
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup 50', () => {
        cy.get('body > div.container > div.content > p:nth-child(3) > span:nth-child(2)').scrollIntoView().should('have.text', '50').click({force:true})
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body.wikipediapreview-body-disambiguation').should('be.visible')
        cy.get('body > div.wp-popup > div > div.wikipediapreview-body.wikipediapreview-body-disambiguation > div.wikipediapreview-body-action > a').click()
        cy.closePopup().click()
        cy.getPopup().should('not.be.visible')  
    })



})