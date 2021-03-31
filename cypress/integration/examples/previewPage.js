import { Homepage } from "../pageObject/HomePage";
const homepage = new Homepage();

describe("Wikimedia preview page test", function () {
  before(function () {
    cy.getHomePage('/')
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("Check the working of all the articles opening", function () {
    // cy.visit("/");
    this.data.airticleName.forEach(function (element) {
      cy.openingArticle(element);
    });
  });
  it("Check Header", function () {
    cy.getHomePage('/')
  cy.getHeader().should("have.text", "Wikipedia Preview demo");
  cy.getHeader().should("have.css", "font-size", "32px");
  });
it("Check Body", () => {
  cy.bodyTitle().should("have.text", "Wildlife of the Central African Republic")
  cy.bodySubTitle().should("have.text", "Language · English")
  // cy.bodyImage().image()
  // cy.homePageBody().a()
})
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "Gili Trawangan")
//   cy.bodySubTitle().should("have.text", "Language · Bahasa Indonesia")
//   // cy.bodyImage().image()
//   // cy.homePageBody().a()
// })
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "विस्तार से जानिये कालिंजर दुर्ग के बारे में")
//   cy.bodySubTitle().should("have.text", "Language · Hindi")
//   // cy.bodyImage().image()
//   // cy.homePageBody().a()
// })
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "เฉลิมชัย โฆษิตพิพัฒน์")
//   cy.bodySubTitle().should("have.text", "Language · Thai")
//   // cy.bodyImage().image()
//   // cy.homePageBody().a()
// })
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "Wildlife of the Central African Republic")
//   cy.bodySubTitle().should("have.text", "Language · Spanish")
// //   cy.bodyImage().image()
// //   cy.homePageBody().a()
// })
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "Wildlife of the Central African Republic")
//   cy.bodySubTitle().should("have.text", "Language · French")
//   // cy.bodyImage().image()
//   // cy.homePageBody().a()
// })
// it("Check next page", () => {
//   cy.bodyTitle().should("have.text", "Wildlife of the Central African Republic")
//   cy.bodySubTitle().should("have.text", "Language · Arabic")
//   // cy.bodyImage().image()
//   // cy.homePageBody().a()
// })

  it("Check Footer", () => {
    homepage.getFooter().scrollIntoView().should("be.visible");
    homepage.getFooter().should("have.css", "font-size", "16px");
  });
});


