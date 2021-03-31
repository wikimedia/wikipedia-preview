import { Homepage } from "../pageObject/HomePage";
const homepage = new Homepage();

describe("Wikimedia preview page test", function () {
  before(function () {
    cy.getHomePage("/");
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
    cy.getHomePage("/");
    homepage.getHeader().should("have.text", "Wikipedia Preview demo");
    homepage.getHeader().should("have.css", "font-size", "32px");
  });

  //will try to do in efficient manner(in loop form)

  it("Check English Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(1) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(1) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · English\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(1)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(1) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Bahasa Indonesia Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(2) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(2) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · Bahasa Indonesia\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(2)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(2) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Hindi Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(3) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(3) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · Hindi\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(3)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(3) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Thai Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(4) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(4) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · Thai\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(4)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(4) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Spanish Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(5) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(5) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · Spanish\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(5)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(5) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check French Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(6) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(6) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · French\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(6)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(6) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Arabic Content ", () => {
    cy.get(
      "body > div.container > div > div:nth-child(7) > a > div.title"
    ).should("have.css", "font-size", "18px");
    cy.get(
      "body > div.container > div > div:nth-child(7) > a > div.subtitle"
    ).should(
      "have.text",
      "\n                            Language · Arabic\n                        "
    );
    cy.get("body > div.container > div > div:nth-child(7)").should(
      "be.visible"
    );
    cy.get(
      "body > div.container > div > div:nth-child(7) > a > div.image > div"
    ).should("be.visible");
  });

  it("Check Footer", () => {
    homepage.getFooter().scrollIntoView().should("be.visible");
    homepage.getFooter().should("have.css", "font-size", "16px");
    homepage
      .getFooter()
      .contains("View Source")
      .should(
        "have.attr",
        "href",
        "https://github.com/wikimedia/wikipedia-preview"
      );
  });
});
