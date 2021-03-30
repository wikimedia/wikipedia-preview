import { Homepage } from "../pageObject/HomePage";
import { AirticelPage } from "../pageObject/airticlePage";

const homepage = new Homepage();
const airticlePage = new AirticelPage();

describe("Wikimedia english page test", function () {
  before(function () {
cy.getHomePage("/articles/english.html");
  });

  it("checking the header", () => {
    // cy.getHomePage("/articles/english.html");
    airticlePage.getHeader().should("have.text", "Wikipedia Preview demo");
    airticlePage.getHeader().should('be.visible').should('have.css', 'font-size', '32px')
  });
  it("cheching the title", () => {
    airticlePage.getTitle().should("have.text", "Wildlife of the Central African Republic");
  });
  it("cheching the cover image", () => {
    airticlePage.getCover().should("be.visible");
  });
  it("Checking the body", () => {
      airticlePage.getPara1().should('have.css', 'font-size', '16px')    
      airticlePage.getPara2().should('have.css', 'font-size', '16px')  
      airticlePage.getPara3().should('have.css', 'font-size', '16px')   
  })
//   it('Check Span Ivory', () => {
//       cy.openingApopups('ivory')
//       cy.previewBox().should('be.visible') 
//       cy.previewBoxHeaderImg().should('be.visible')  
//       cy.previewBoxCloseBtn().
//       cy.contains('Continue Reading').click()
//       cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
//       cy.previewBoxFooterImg2().should('be.visible')    
//       cy.previewBoxFooterImg3().should('be.visible') 
//       cy.previewBoxCloseBtn().should('be.visible')
//       cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
//       cy.go('back')  

//       cy.openingApopups('Bamingui-Bangoran National')
//       cy.previewBox().should('be.visible') 
//       cy.previewBoxHeaderImg().should('be.visible')  
//       cy.previewBoxCloseBtn().
//       cy.contains('Continue Reading').click()
//       cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
//       cy.previewBoxFooterImg2().should('be.visible')    
//       cy.previewBoxFooterImg3().should('be.visible') 
//       cy.previewBoxCloseBtn().should('be.visible')
//       cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
//       cy.go('back')  


//       cy.openingApopups('Chinko Project')
//       cy.previewBox().should('be.visible') 
//       cy.previewBoxHeaderImg().should('be.visible')  
//       cy.previewBoxCloseBtn().
//       cy.contains('Continue Reading').click()
//       cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
//       cy.previewBoxFooterImg2().should('be.visible')    
//       cy.previewBoxFooterImg3().should('be.visible') 
//       cy.previewBoxCloseBtn().should('be.visible')
//       cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
//       cy.go('back')  

//       cy.openingApopups('50')
//       cy.previewBox().should('be.visible') 
//       cy.previewBoxHeaderImg().should('be.visible')  
//       cy.previewBoxCloseBtn().
//       cy.contains('Continue Reading').click()
//       cy.previewBoxFooterImg1().scrollIntoView().should('be.visible')  
//       cy.previewBoxFooterImg2().should('be.visible')    
//       cy.previewBoxFooterImg3().should('be.visible') 
//       cy.previewBoxCloseBtn().should('be.visible')
//       cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
//       cy.go('back') 
      
// })
it("cheching all the ivory in loop", () => {
    cy.openingApopups('ivory')
    cy.openingApopups('Bamingui-Bangoran National')
    cy.openingApopups('Chinko Project')
    cy.openingApopups('50')
  });
  it("cheching the footer", () => {
    airticlePage.getFooter().contains("View Source");
  });
});
