export class AirticelPage {
  getHeader() {
    return cy.get("body > a > div.header");
  }
  getTitle() {
    return cy.get("body > div.container > div.title > p");
  }
  getCover() {
    return cy.get("body > div.container > div.cover");
  }
  getPara1() {
    return cy.get("body > div.container > div.content > p:nth-child(1)");
  }
  getPara2() {
    return cy.get("body > div.container > div.content > p:nth-child(2)");
  }
  getPara3() {
    return cy.get("body > div.container > div.content > p:nth-child(3)");
  }
  getPara4() {
    return cy.get("body > div.container > div.content > p:nth-child(4)");
  }
  getFooter() {
    return cy.get("body > div.footer > p");
  }
}
