describe('Functionality testing in phone resolution', () => {
    it('Checks if all the links have destination URL', () => {
      cy.visit("localhost:8080")
      cy.viewport('iphone-6')
      cy.get("a").each($a => {
        expect($a).to.not.have.attr("href", "#undefined");
      });
      cy.get("link").each($a => {
        expect($a).to.not.have.attr("href", "#undefined");
      });
    });
  });
  