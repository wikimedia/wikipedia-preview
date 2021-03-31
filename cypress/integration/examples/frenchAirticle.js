import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/french.html");
  });

  it("checking the header", () => {
    // cy.getHomePage("/articles/english.html");
    airticlePage.getHeader().should("have.text", "Wikipedia Preview demo");
    airticlePage
      .getHeader()
      .should("be.visible")
      .should("have.css", "font-size", "32px");
    airticlePage.getHeaderLink().should("have.attr", "href", "../index.html");
  });
  it("cheching the title", () => {
    airticlePage
      .getTitle()
      .should("have.text", "Conseil de sécurité des Nations unies");
  });
  it("cheching the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Checking the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
  });

  it("cheching the popups résolutions", () => {
      airticlePage.getSpan2().should('have.text','résolutions')
    airticlePage.getSpan2().trigger('mouseenter')
    cy.popUpBoxHeaderImg().should('be.visible')
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Continuer à lire").click(); 
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg3().scrollIntoView().should("be.visible");
    cy.contains("Lire davantage sur Wikipédia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
        "have.attr",
        "href",
        "https://fr.wikipedia.org/wiki/Conseil_de_s%C3%A9curit%C3%A9_des_Nations_unies?wprov=wppw1"
      ); 
      cy.popUpBoxCloseBtn().click();

    })
    it("cheching the popups droit de veto", () => {
        airticlePage.getSpan3().should('have.text','droit de veto')
      airticlePage.getSpan3().trigger('mouseenter')
    //   cy.popUpBoxHeaderImg().should('be.visible')
      cy.popUpBoxCloseBtn().should("be.visible");
    //   cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible")
      cy.contains("Lire davantage sur Wikipédia").should("be.visible");
      cy.popUpBoxFoooterLink().should(
          "have.attr",
          "href",
          "https://fr.wikipedia.org/wiki/Veto?wprov=wppw1"
        ); 
        cy.popUpBoxCloseBtn().click();
  });
  it("cheching the footer", () => {
    airticlePage
      .getFooter()
      .contains("Conseil de sécurité des Nations unies")
      .should(
        "have.attr",
        "href",
        "https://fr.m.wikipedia.org/wiki/Conseil_de_s%C3%A9curit%C3%A9_des_Nations_unies"
      );
    airticlePage
      .getFooter()
      .contains("View Source")
      .should(
        "have.attr",
        "href",
        "https://github.com/wikimedia/wikipedia-preview"
      );
  });
});