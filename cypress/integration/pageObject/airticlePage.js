export class AirticelPage {
  getHeader() {
    return cy.get("body > a > div.header");
  }
  getHeaderLink() {
    return cy.get("body > a ");
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
  getSpan1A(){
    return cy.get('body > div.container > div.content > p:nth-child(1) > a')
  }
  getSpan1(){
    return cy.get('body > div.container > div.content > p:nth-child(1) > span')
  }
  getSpan2(){
    return  cy.get('body > div.container > div.content > p:nth-child(2) > span')
  }
  getSpan3(){
    return  cy.get('body > div.container > div.content > p:nth-child(3) > span')
  }
  getSpan4(){
    return  cy.get('body > div.container > div.content > p:nth-child(4) > span')
  }
  getCloseButton(){
      return cy.get('body > div.wp-popup > div.wikipediapreview > div.wikipediapreview-header > div.wikipediapreview-header-closebtn')
  }
  getFooter() {
    return cy.get("body > div.footer > p ");
  }

}
