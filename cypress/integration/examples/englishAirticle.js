import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/english.html");
  });

  it("check the header", () => {
    // cy.getHomePage("/articles/english.html");
    airticlePage.getHeader().should("have.text", "Wikipedia Preview demo");
    airticlePage
      .getHeader()
      .should("be.visible")
      .should("have.css", "font-size", "32px");
    airticlePage.getHeaderLink().should("have.attr", "href", "../index.html");
  });
  it("check the title", () => {
    airticlePage
      .getTitle()
      .should("have.text", "Wildlife of the Central African Republic");
  });
  it("check the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Check the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
    airticlePage.getPara3().should("have.css", "font-size", "16px");
  });

  it("check all the popups in loop", () => {
    cy.openingApopups("ivory");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://en.wikipedia.org/wiki/Ivory?wprov=wppw1"
    );
    // will make a method to check third picture
    cy.openingApopups("Bamingui-Bangoran National");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://en.wikipedia.org/wiki/Bamingui-Bangoran_National_Park_and_Biosphere_Reserve?wprov=wppw1"
    );
    cy.openingApopups("Chinko Project");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://en.wikipedia.org/wiki/Chinko?wprov=wppw1"
    );
    // cy.openingApopups('50')
  });

  it("check the popup 50 ", () => {
    cy.get("span.wmf-wp-with-preview").contains("50").click({ force: true });
    cy.wait(2000);
    cy.popUpBox().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Read on Wikipedia").should("be.visible");
    cy.get(
      "body > div.wp-popup > div > div.wikipediapreview-body.wikipediapreview-body-disambiguation > div.wikipediapreview-body-action > a"
    ).should(
      "have.attr",
      "href",
      "https://en.wikipedia.org/wiki/50?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });
  it("check the footer", () => {
    airticlePage
      .getFooter()
      .contains("Wildlife of the Central African Republic")
      .should(
        "have.attr",
        "href",
        "https://en.m.wikipedia.org/wiki/Wildlife_of_the_Central_African_Republic"
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
