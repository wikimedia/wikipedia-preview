Cypress.Commands.add( 'navigateToTestPage', () => {
	cy.viewport( 1220, 750 )
	cy.visit( 'demo/articles/test.html' )
} )

Cypress.Commands.add( 'navigateToEnglishPage', () => {
	cy.viewport( 1220, 750 )
	cy.visit( 'demo/articles/english.html' )
} )

Cypress.Commands.add( 'navigateToMobileTestPage', () => {
	cy.viewport( 550, 750 )
	cy.visitMobile( 'demo/articles/test.html' )
} )
