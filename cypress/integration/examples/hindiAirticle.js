import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/hindi.html");
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
      .should("have.text", "विस्तार से जानिये कालिंजर दुर्ग के बारे में");
  });
  it("cheching the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Checking the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
    airticlePage.getPara3().should("have.css", "font-size", "16px");
    airticlePage.getPara4().should("have.css", "font-size", "16px");
  });

  it("cheching the popups मन्दिर", () => {
      airticlePage.getSpan1().should('have.text','मन्दिर')
    airticlePage.getSpan1().trigger('mouseenter')
    cy.popUpBoxHeaderImg().should('be.visible')
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("पढ़ना जारी रखें").click(); 
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");

    cy.contains("विकिपीडिया पर अधिक पढ़ें").should("be.visible");
    cy.popUpBoxFoooterLink().should(
        "have.attr",
        "href",
        "https://hi.wikipedia.org/wiki/%E0%A4%AE%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A4%BF%E0%A4%B0?wprov=wppw1"
      ); 
      cy.popUpBoxCloseBtn().click();

    })
    it("cheching the popups हुमांयू", () => {
        airticlePage.getSpan2().should('have.text','हुमांयू')
      airticlePage.getSpan2().trigger('mouseenter')
      cy.popUpBoxHeaderImg().should('be.visible')
      cy.popUpBoxCloseBtn().should("be.visible");
      cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible")
      cy.contains("विकिपीडिया पर अधिक पढ़ें").should("be.visible");
      cy.popUpBoxFoooterLink().should(
          "have.attr",
          "href",
          "https://hi.wikipedia.org/wiki/%E0%A4%B9%E0%A5%81%E0%A4%AE%E0%A4%BE%E0%A4%AF%E0%A5%82%E0%A4%81?wprov=wppw1"
        ); 
        cy.popUpBoxCloseBtn().click();
  });
  it("cheching the popups अंकगणितीय", () => {
    airticlePage.getSpan4().should('have.text','अंकगणितीय')
  airticlePage.getSpan4().trigger('mouseenter')
  cy.popUpBoxHeaderImg().should('be.visible')
  cy.popUpBoxCloseBtn().should("be.visible");
  cy.contains("पढ़ना जारी रखें").click(); 
  cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");

  cy.contains("विकिपीडिया पर अधिक पढ़ें").should("be.visible");
  cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://hi.wikipedia.org/wiki/%E0%A4%85%E0%A4%82%E0%A4%95%E0%A4%97%E0%A4%A3%E0%A4%BF%E0%A4%A4?wprov=wppw1"
    ); 
    cy.popUpBoxCloseBtn().click();

  })
  it("cheching the footer", () => {
    airticlePage
      .getFooter()
      .contains("कालिंजर").trigger('mouseenter')
      .should(
        "have.attr",
        "href",
        "https://hi.m.wikipedia.org/wiki/%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A4%BF%E0%A4%82%E0%A4%9C%E0%A4%B0_%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97"
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