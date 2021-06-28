Cypress.Commands.add( 'navigateToHomePage', ( url = '' ) => {
	cy.visit( String( url ) )
} )

Cypress.Commands.add( 'navigateToMobileHomePage', ( url = '' ) => {
	cy.visitMobile( String( url ) )
} )
