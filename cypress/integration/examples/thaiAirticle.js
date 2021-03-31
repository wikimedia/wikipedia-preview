import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/thai.html");
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
      .should("have.text", "เฉลิมชัย โฆษิตพิพัฒน์");
  });
  it("check the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Check the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
  });

  it("cheching the popups พระมหาชนก", () => {
      airticlePage.getSpan1B().should('have.text','พระมหาชนก')
    airticlePage.getSpan1B().trigger('mouseenter')
    cy.wait(1000)
    cy.popUpBoxHeaderImg().should('be.visible')
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("อ่านต่อ").click(); 
    cy.wait(1000)
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.contains("อ่านเพิ่มเติมบนวิกิพีเดีย").should("be.visible");
    cy.popUpBoxFoooterLink().should(
        "have.attr",
        "href",
        "https://th.wikipedia.org/wiki/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99%E0%B8%81?wprov=wppw1"
        
      ); 
      cy.popUpBoxCloseBtn().click();

    })
    it("check the popup วัดร่องขุ่น", () => {
        airticlePage.getSpan1C().should('have.text','วัดร่องขุ่น')
      airticlePage.getSpan1C().trigger('mouseenter')
      cy.wait(1000)
      cy.popUpBoxHeaderImg().should('be.visible')
      cy.popUpBoxCloseBtn().should("be.visible");
      cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible")
      cy.contains("อ่านเพิ่มเติมบนวิกิพีเดีย").should("be.visible");
      cy.popUpBoxFoooterLink().should(
          "have.attr",
          "href",
          "https://th.wikipedia.org/wiki/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%B8%E0%B9%88%E0%B8%99?wprov=wppw1"
        ); 
        cy.popUpBoxCloseBtn().click();
  });
  it("check the popup จังหวัดเชียงราย", () => {
    airticlePage.getSpan2().should('have.text','จังหวัดเชียงราย')
  airticlePage.getSpan2().trigger('mouseenter')
  cy.wait(1000)
  cy.popUpBoxHeaderImg().should('be.visible')
  cy.popUpBoxCloseBtn().should("be.visible");
  cy.contains("อ่านต่อ").click(); 
  cy.wait(1000)
  cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
  cy.popUpBoxFooterImg2().scrollIntoView().should("be.visible");
  cy.popUpBoxFooterImg3().scrollIntoView().should("be.visible");
  cy.contains("อ่านเพิ่มเติมบนวิกิพีเดีย").should("be.visible");
  cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://th.wikipedia.org/wiki/%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%A3%E0%B8%B2%E0%B8%A2?wprov=wppw1"
    ); 
    cy.popUpBoxCloseBtn().click();

  })
  it("check the footer", () => {
    airticlePage
      .getFooter()
      .contains("เฉลิมชัย โฆษิตพิพัฒน์")
      .should(
        "have.attr",
        "href",
        "https://th.m.wikipedia.org/wiki/%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%B4%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B8%A2_%E0%B9%82%E0%B8%86%E0%B8%A9%E0%B8%B4%E0%B8%95%E0%B8%9E%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C"
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