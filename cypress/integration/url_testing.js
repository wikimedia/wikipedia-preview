describe('It checks the url of all visitable the pages', ()=>{
    it('Checks URL for main page',()=>{
        cy.visit("http://localhost:8080").url().should('include', '/')
    })
    it('Checks URL for arabic page', () => {
        cy.visit('http://localhost:8080/articles/arabic.html').url().should('include', '/articles/arabic.html') 
    })

    it('Checks URL for thai page', () => {
        cy.visit('http://localhost:8080/articles/thai.html').url().should('include', '/articles/thai.html')  
    })

    it('Checks URL for spanish page', () => {
        cy.visit('http://localhost:8080/articles/spanish.html').url().should('include', '/articles/spanish.html') 
    })

    it('Checks URL for indonesian page', () => {
        cy.visit('http://localhost:8080/articles/bahasaIndonesia.html').url().should('include', '/articles/bahasaIndonesia.html')
    })

    it('Checks URL for hindi page', () => {
        cy.visit('http://localhost:8080/articles/hindi.html').url().should('include', '/articles/hindi.html') 
    })

    it('Checks URL for french page', () => {
        cy.visit('http://localhost:8080/articles/french.html').url().should('include', '/articles/french.html')  
    })

    it('Checks URL for english page', () => {
        cy.visit('http://localhost:8080/articles/english.html').url().should('include', '/articles/english.html')  
    })
})

describe('It checks the url of all visitable the pages mobile view', ()=>{
    it('Checks URL for main page',()=>{
        cy.visit("http://localhost:8080").url().should('include', '/')
        cy.viewport('samsung-s10')
    })
    it('Checks URL for arabic page', () => {
        cy.visit('http://localhost:8080/articles/arabic.html').url().should('include', '/articles/arabic.html') 
    })

    it('Checks URL for thai page', () => {
        cy.visit('http://localhost:8080/articles/thai.html').url().should('include', '/articles/thai.html')  
    })

    it('Checks URL for spanish page', () => {
        cy.visit('http://localhost:8080/articles/spanish.html').url().should('include', '/articles/spanish.html') 
    })

    it('Checks URL for indonesian page', () => {
        cy.visit('http://localhost:8080/articles/bahasaIndonesia.html').url().should('include', '/articles/bahasaIndonesia.html')
    })

    it('Checks URL for hindi page', () => {
        cy.visit('http://localhost:8080/articles/hindi.html').url().should('include', '/articles/hindi.html') 
    })

    it('Checks URL for french page', () => {
        cy.visit('http://localhost:8080/articles/french.html').url().should('include', '/articles/french.html')  
    })

    it('Checks URL for english page', () => {
        cy.visit('http://localhost:8080/articles/english.html').url().should('include', '/articles/english.html')  
    })
})