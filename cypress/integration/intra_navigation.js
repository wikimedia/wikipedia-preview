// This is different from url testing as we use website buttons and browser button to navigate instead of just visiting the page
describe('Check for all the navigation within the website',()=>{
    it('navigates through the website', () => {
    cy.visit("http://localhost:8080").url().should('include', '/')

    cy.get('body > div.container > div > div:nth-child(1) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/english.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(2) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/bahasaIndonesia.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(3) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/hindi.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(4) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/thai.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(5) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/spanish.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(6) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/french.html')
    cy.go('back')

    cy.get('body > div.container > div > div:nth-child(7) > a > div.title')
    .should('be.visible').click()
    cy.url().should('include', '/articles/arabic.html')
    cy.go('back')

    cy.log("Website is able to navigate through all the articles and use browser features to go back, to go to the previous page");
        
    });   

})

describe('Check for all the navigation within the website for phone ',()=>{
    it('navigates through the website', () => {
        cy.visit("http://localhost:8080").url().should('include', '/')
    
        cy.get('body > div.container > div > div:nth-child(1) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/english.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(2) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/bahasaIndonesia.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(3) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/hindi.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(4) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/thai.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(5) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/spanish.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(6) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/french.html')
        cy.go('back')
    
        cy.get('body > div.container > div > div:nth-child(7) > a > div.title')
        .should('be.visible').click()
        cy.url().should('include', '/articles/arabic.html')
        cy.go('back')
    
        cy.log("Website is able to navigate through all the articles and use browser features to go back, to go to the previous page");
            
        });    

})