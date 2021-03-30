describe('Testing thai article', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/thai.html').url().should('include', '/thai.html')  
    })


    it('Popup พระมหาชนก', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'พระมหาชนก').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'อ่านต่อ').click()     
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup วัดร่องขุ่น', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'วัดร่องขุ่น').click({force:true})
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'อ่านต่อ').click({force:true})      
        cy.goToWiki().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible') 
    })

    it('Popup จังหวัดเชียงราย', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'จังหวัดเชียงราย').click({ force: true })
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'อ่านต่อ').click()        
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })


})

describe('Testing thai article for phone', () => {

    it('Visit URL', () => {
        cy.visit('http://localhost:8080/articles/thai.html').url().should('include', '/thai.html')
        cy.viewport('samsung-s10') 
    })


    it('Popup พระมหาชนก', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(1)').should('have.text', 'พระมหาชนก').click()
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'อ่านต่อ').click()     
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible')  
    })

    it('Popup วัดร่องขุ่น', () => {
        cy.get('body > div.container > div.content > p:nth-child(1) > span:nth-child(2)').should('have.text', 'วัดร่องขุ่น').click({force:true})
        cy.getPopup().should('be.visible')  
        cy.continueReading().should('have.text', 'อ่านต่อ').click({force:true})      
        cy.goToWiki().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click() 
        cy.closePopup().click()  
        cy.getPopup().should('not.be.visible') 
    })

    it('Popup จังหวัดเชียงราย', () => {
        cy.get('body > div.container > div.content > p:nth-child(2) > span').should('have.text', 'จังหวัดเชียงราย').click({ force: true })
        cy.getPopup().should('be.visible') 
        cy.continueReading().should('have.text', 'อ่านต่อ').click()        
        cy.readMoreBtn().should('be.visible').should('have.text', 'อ่านเพิ่มเติมบนวิกิพีเดีย').click()  
        cy.closePopup().click() 
        cy.getPopup().should('not.be.visible')  
    })


})