import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/spanish.html");
  });

  it("checkthe header", () => {
    // cy.getHomePage("/articles/english.html");
    airticlePage.getHeader().should("have.text", "Wikipedia Preview demo");
    airticlePage
      .getHeader()
      .should("be.visible")
      .should("have.css", "font-size", "32px");
    airticlePage.getHeaderLink().should("have.attr", "href", "../index.html");
  });
  it("check the title", () => {
    airticlePage.getTitle().should("have.text", "Nikola Tesla");
  });
  it("check the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Check the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
    airticlePage.getPara3().should("have.css", "font-size", "16px");
  });

  it("check the popup motor de corriente alterna", () => {
    airticlePage.getSpan1().should("have.text", "motor de corriente alterna");
    airticlePage.getSpan1().trigger("mouseenter");
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Continuar leyendo").click();
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg3().scrollIntoView().should("be.visible");
    cy.contains("Leer más en Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://es.wikipedia.org/wiki/Motor_de_corriente_alterna?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });

  it("check the popup  Edison", () => {
    airticlePage.getSpan2().should("have.text", "Edison");
    airticlePage.getSpan2().trigger("mouseenter");
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Continuar leyendo").click();
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg3().scrollIntoView().should("be.visible");
    cy.contains("Leer más en Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://es.wikipedia.org/wiki/Thomas_Alva_Edison?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });

  it("check the popup Smiljan", () => {
    airticlePage.getSpan3().should("have.text", "Smiljan");
    airticlePage.getSpan3().trigger("mouseenter");
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().scrollIntoView().should("be.visible");
    cy.contains("Leer más en Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://es.wikipedia.org/wiki/Smiljan?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });

  it("check the footer", () => {
    airticlePage
      .getFooter()
      .contains("Nikola Tesla")
      .should(
        "have.attr",
        "href",
        "https://es.m.wikipedia.org/wiki/Nikola_Tesla"
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
