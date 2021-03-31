import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
    cy.getHomePage("/articles/bahasaIndonesia.html");
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
    airticlePage.getTitle().should("have.text", "Gili Trawangan");
  });
  it("check the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Check the body", () => {
    airticlePage.getPara1().should("have.css", "font-size", "16px");
    airticlePage.getPara2().should("have.css", "font-size", "16px");
  });

  it("check the popups Lombok", () => {
    airticlePage.getSpan1A().should("have.text", "Lombok");
    airticlePage
      .getSpan1A()
      .should(
        "have.attr",
        "href",
        "https://id.wikipedia.org/wiki/Pulau_Lombok"
      );
    airticlePage.getSpan1A().trigger("mouseenter");
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Lanjutkan Membaca").click();
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().should("be.visible");
    cy.popUpBoxFooterImg3().should("be.visible");
    cy.contains("Baca lebih lanjut tentang Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://id.wikipedia.org/wiki/Pulau_Lombok?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });
  it("check the popup Gili Meno", () => {
    airticlePage.getSpan2().should("have.text", "Gili Meno");
    airticlePage.getSpan2().trigger("mouseenter");
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    cy.contains("Lanjutkan Membaca").click();
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().should("be.visible");
    cy.popUpBoxFooterImg3().should("be.visible");
    cy.contains("Baca lebih lanjut tentang Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://id.wikipedia.org/wiki/Gili_Meno?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
  });

  it("check the footer", () => {
    airticlePage
      .getFooter()
      //   <a href="" target="_blank" data-wp-title="Gili_Trawangan" data-wp-lang="id"></a>
      .contains("Gili Trawangan")
      .trigger("mouseenter")
      .should(
        "have.attr",
        "href",
        "https://id.m.wikipedia.org/wiki/Gili_Trawangan"
      );
    cy.popUpBoxHeaderImg().should("be.visible");
    cy.popUpBoxCloseBtn().should("be.visible");
    //   cy.popUpBoxHeader()
    cy.contains("Lanjutkan Membaca").click();
    cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
    cy.popUpBoxFooterImg2().should("be.visible");
    cy.popUpBoxFooterImg3().should("be.visible");
    cy.contains("Baca lebih lanjut tentang Wikipedia").should("be.visible");
    cy.popUpBoxFoooterLink().should(
      "have.attr",
      "href",
      "https://id.wikipedia.org/wiki/Gili_Trawangan?wprov=wppw1"
    );
    cy.popUpBoxCloseBtn().click();
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
