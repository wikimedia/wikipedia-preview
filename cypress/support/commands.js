// I have used custom commands for the repetetive selectors 

Cypress.Commands.add('getPopup', () => {
    cy.get('body > div.wp-popup',{timeout:5000}) // Get the popup element 
})
Cypress.Commands.add('closePopup', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-closebtn') // gets the close button inside popup element
})
Cypress.Commands.add('continueReading', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-footer > span',{timeout:5000}) //get the continue reading button inside popup
})
Cypress.Commands.add('goToWiki', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-footer > a',{timeout:5000}) // gets the wikipedia hyperlink for that popup article
})




