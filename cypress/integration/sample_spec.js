describe('Cypress Practice', () => {
  it('visit the website locally hosted', () => {
		cy.visit("localhost:8080")

    for (var i =0;i<7;i++){
      cy.get(".data-link"+(i+1)).click()
      cy.wait(3000)
      cy.go('back')
    }



  })
})
