/// <reference types="Cypress" />

describe('Testing HomePage', () => {

  it('Check URL', () => {
    cy.visit('http://localhost:8080/index.html').url().should('include', '/index.html') 
  })

  it('Check Header', () => {
    cy.get('body > div.header').should('be.visible').should('have.text', 'Wikipedia Preview demo') 
  })

  it('Check Header Font-Size', () => {
    cy.get('body > div.header').should('be.visible').should('have.css', 'font-size', '32px')  
  })

  it('Check Footer', () => {
    cy.get('body > div.footer').should('be.visible').should('have.text', '\n            \n                Articles on this list are from Wikipedia, which is released under the Creative Commons Attribution-Share-Alike License 3.0.\n                \n                 View Source \n            \n        ') // Validation Check for Footer
  })

  it('Check Footer Font-Size', () => {
    cy.get('body > div.footer > p').should('be.visible').should('have.css', 'font-size', '12px')   
  })

  it('Check Image Gallery', () => {
    cy.get('body > div.container > div > div:nth-child(1) > a > div.image > div').should('be.visible')  //Language: English
    cy.get('body > div.container > div > div:nth-child(2) > a > div.image > div').should('be.visible')   //Language: Bahasa Indonesia
    cy.get('body > div.container > div > div:nth-child(3) > a > div.image > div').should('be.visible')   //Language: Hindi
    cy.get('body > div.container > div > div:nth-child(4) > a > div.image > div').should('be.visible')   //Language: Thai
    cy.get('body > div.container > div > div:nth-child(5) > a > div.image > div').should('be.visible')   //Language: Spanish
    cy.get('body > div.container > div > div:nth-child(6) > a > div.image > div').should('be.visible')   //Language: French
    cy.get('body > div.container > div > div:nth-child(7) > a > div.image > div').should('be.visible')    //Language: Arabic
  })

  it('Check English Content ', () => {
    cy.get('body > div.container > div > div:nth-child(1)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(1) > a > div.subtitle').should('have.text', '\n                            Language · English\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(1) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check Bahasa Indonesia Content ', () => {
    cy.get('body > div.container > div > div:nth-child(2)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(2) > a > div.subtitle').should('have.text', '\n                            Language · Bahasa Indonesia\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(2) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check Hindi Content ', () => {
    cy.get('body > div.container > div > div:nth-child(3)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(3) > a > div.subtitle').should('have.text', '\n                            Language · Hindi\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(3) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check Thai Content ', () => {
    cy.get('body > div.container > div > div:nth-child(4)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(4) > a > div.subtitle').should('have.text', '\n                            Language · Thai\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(4) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check Spanish Content ', () => {
    cy.get('body > div.container > div > div:nth-child(5)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(5) > a > div.subtitle').should('have.text', '\n                            Language · Spanish\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(5) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check French Content ', () => {
    cy.get('body > div.container > div > div:nth-child(6)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(6) > a > div.subtitle').should('have.text', '\n                            Language · French\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(6) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

  it('Check Arabic Content ', () => {
    cy.get('body > div.container > div > div:nth-child(7)').should('be.visible')  //Checking visibility of the container
    cy.get('body > div.container > div > div:nth-child(7) > a > div.subtitle').should('have.text', '\n                            Language · Arabic\n                        ') //Checking subtitle for language validation
    cy.get('body > div.container > div > div:nth-child(7) > a > div.title').should('have.css', 'font-size', '18px') //Validating font size of title
  })

})