export class Homepage {
  
getHeader(){
   return cy.get("body > div.header")
}
getFooter() {
   return cy.get("body > div.footer");
}
bodyTitle() {
    return  cy.get("body> div.container > div.listview > div.item > a > div.title");
  }
bodyImage ()  {
    return   cy.get("body> div.container > div.listview > div.item > a > div.image");
  }
  
bodySubTitle () {
    return   cy.get("body> div.container > div.listview > div.item > a > div.image > div.subtitle");
  }


}