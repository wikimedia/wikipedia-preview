describe('it tests the complete homepage for Desktop view', ()=>{
    it('visits the main page', () => {
        cy.visit('http://localhost:8080/')
    });

    it('Checks for header text', () => {
        cy.get('body > div.header').should('have.text','Wikipedia Preview demo');    
    });

    it('Checks all the articles for title text',()=>{
        cy.get('body > div.container > div > div:nth-child(1) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(2) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(3) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(4) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(5) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(6) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(7) > a > div.title')
        .should('be.visible')

    })

    it('Checks all the herf tag for articles',()=>{
        cy.get('body > div.container > div > div:nth-child(1) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(2) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(3) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(4) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(5) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(6) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(7) > a ')
        .should('not.have.text','#undefined')


    })
    
})


describe('it tests the complete homepage for Mobile view', ()=>{
    it('visits the main page', () => {
        cy.visit('http://localhost:8080/')
        cy.viewport('samsung-s10')
    });

    it('Checks for header text', () => {
        cy.get('body > div.header').should('have.text','Wikipedia Preview demo');    
    });

    it('Checks all the articles for title text',()=>{
        cy.get('body > div.container > div > div:nth-child(1) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(2) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(3) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(4) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(5) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(6) > a > div.title')
        .should('be.visible')

        cy.get('body > div.container > div > div:nth-child(7) > a > div.title')
        .should('be.visible')

    })

    it('Checks all the herf tag for articles',()=>{
        cy.get('body > div.container > div > div:nth-child(1) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(2) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(3) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(4) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(5) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(6) > a ')
        .should('not.have.text','#undefined')

        cy.get('body > div.container > div > div:nth-child(7) > a ')
        .should('not.have.text','#undefined')


    })
    
})

