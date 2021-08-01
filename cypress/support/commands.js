Cypress.Commands.add( 'navigateToTestPage', () => {
	cy.visit( '/articles/test.html' )
} )

Cypress.Commands.add( 'navigateToEnglishPage', () => {
	cy.visit( '/articles/english.html' )
} )

Cypress.Commands.add( 'navigateToMobileTestPage', () => {
	cy.visitMobile( '/articles/test.html' )
	cy.viewport( 550, 750 )
} )
