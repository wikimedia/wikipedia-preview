
import { Homepage } from "../pageObject/HomePage";
const homepage = new Homepage();

describe("My painful test", function () {
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("My first code", function () {
    // cy.visit("/");
    homepage.getHomePage("/");
    this.data.airticleName.forEach(function (element) {
      cy.openingArticle(element);
    });
  //   cy.contains("Wikipedia Preview demo ").should("be.visible");
  //   cy.wait(1000);
  //   cy.contains("View Source").scrollIntoView();
  //   cy.wait(1000);
  //   // cy.contains('Wikipedia Preview demo').scrollIntoView()
  //   cy.get(".item").should("have.length", 7);
  //   cy.contains("View Source");
  //   // cy.contains('View Source').invoke('removeAttr','target').click()
  //   // cy.url().should('eq','https://github.com/wikimedia/wikipedia-preview')
  //   // title = ""
  //   // language = english
  //   // href= ""
  });
  it("My second code", function () {
    homepage.getHomePage("/");
    cy.contains("Wildlife of the Central African Republic");
  });
  it("viewing aticles and the small popups",function(){
    cy.contains('Wildlife of the Central African Republic').click()
    cy.openingApopups('ivory')
    // cy.get('div.cover').should('have.css', 'background-image', '../img/english-pic.png')
    // cy.get('span.wmf-wp-with-preview').should('eq','ivory').click()
    // cy.get('div.url').should('eq','../img/english-pic.png')
  })
});






{/* <span class="wmf-wp-with-preview" data-wikipedia-preview="">ivory</span> */}
//  url('../img/english-pic.png');">
          









// // it("third test", function () {
// //   cy.openingArticle("Wildlife of the Central African Republic");
// //   cy.openingArticle("Gili Trawangan");
// //   cy.openingArticle("विस्तार से जानिये कालिंजर दुर्ग के बारे में");
// //   cy.openingArticle("เฉลิมชัย โฆษิตพิพัฒน์");
// //   cy.openingArticle("Nikola Tesla");
// //   cy.openingArticle("Conseil de sécurité des Nations unies");
// //   cy.openingArticle("أم كلثوم (مطربة)");
// // });


    // ./node_modules/.bin/cypress open
    // "baseUrl" : "http://localhost:8080"