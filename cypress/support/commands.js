import { AirticelPage } from "../integration/pageObject/airticlePage";
import { Homepage } from "../integration/pageObject/HomePage";
const homepage = new Homepage();
const airticelPage = new AirticelPage();

Cypress.Commands.add("openingArticle", (articleName) => {
  cy.get("div.title").each(($el, index, $list) => {
    if ($el.text().includes(articleName)) {
      cy.get("div.title").eq(index);
      cy.getHomePage('/')
      // cy.go('back')
    }
  });
});
Cypress.Commands.add("getHomePage", (page) => {
  return cy.visit("http://localhost:8080" + page);
});
Cypress.Commands.add("bodyTitle", (articleName) => {
  cy.get("div.title").each(($el, index, $list) => {
    if ($el.text().includes(articleName)) {
      cy.get("div.title").eq(index).get("div.para").eq(index);
      // cy.go('back')
    }
  });
});
Cypress.Commands.add("openingApopups2", (popupName) => {
  cy.get("span.wmf-wp-with-preview").each(($el, index, $list) => {
    if ($el.text().includes(popupName)) {
      // cy.get('span.wmf-wp-with-preview').eq(index).trigger('mouseover')
      // cy.get('span.wmf-wp-with-preview').eq(index).invoke('show')
      cy.get("span.wmf-wp-with-preview").eq(index).click({ force: true });
      cy.wait(2000);
      cy.popUpBox().should("be.visible");
      cy.popUpBoxHeaderImg().should("be.visible");
      cy.popUpBoxCloseBtn().should("be.visible");
      // <span class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore">Lanjutkan Membaca</span>
      cy.contains("Lanjutkan Membaca").click();
      cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
      cy.wait(2000);
      cy.popUpBoxFooterImg2().should("be.visible");
      cy.popUpBoxCloseBtn().should("be.visible");
      // <a href="https://id.wikipedia.org/wiki/Pulau_Lombok?wprov=wppw1" class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki" target="_blank"></a>
      cy.contains("Baca lebih lanjut tentang Wikipedia").should("be.visible");
      cy.popUpBoxCloseBtn().click();
      // cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
      // homepage.getHomePage('/articles/english.html');
      // cy.go(-1)
      //  airticelPage.getCloseButton('wikipediapreview-header-closebtn').click()
    }
  });
});
Cypress.Commands.add("openingApopups", (popupName) => {
  cy.get("span.wmf-wp-with-preview").each(($el, index, $list) => {
    if ($el.text().includes(popupName)) {
      // cy.get('span.wmf-wp-with-preview').eq(index).trigger('mouseover')
      // cy.get('span.wmf-wp-with-preview').eq(index).invoke('show')
      // cy.get("span.wmf-wp-with-preview").eq(index).click({ force: true });
      cy.get("span.wmf-wp-with-preview").eq(index).trigger('mouseenter')
      cy.wait(2000);
      cy.popUpBox().should("be.visible");
      cy.popUpBoxHeaderImg().should("be.visible");
      cy.popUpBoxCloseBtn().should("be.visible");
      cy.contains("Continue Reading").click();
      cy.popUpBoxFooterImg1().scrollIntoView().should("be.visible");
      cy.wait(2000);
      cy.popUpBoxFooterImg2().should("be.visible");
      // cy.popUpBoxFooterImg3().should("be.visible");
      cy.popUpBoxCloseBtn().should("be.visible");
      cy.contains("Read more on Wikipedia").should("be.visible");
      cy.popUpBoxCloseBtn().click();
      // cy.contains('Read more on Wikipedia').invoke('removeAttr','target').click()
      // homepage.getHomePage('/articles/english.html');
      // cy.go(-1)
      //  airticelPage.getCloseButton('wikipediapreview-header-closebtn').click()
    }
  });
});

// Cypress.Commands.add("bodyUrl", () => {
//     cy.get("body> div.container > div.listview > div.item > a ");
//   });

// Cypress.Commands.add("coverImage", () => {
//   cy.get("body > div.container > div.cover", { timeout: 5000 });
// });

Cypress.Commands.add("popUpBox", () => {
  cy.get("body > div.wp-popup");
});

Cypress.Commands.add("popUpBoxHeaderImg", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-image",
    { timeout: 5000 }
  );
});
Cypress.Commands.add("popUpBoxHeader", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-wordmark wikipediapreview-header-wordmark-with-image wikipediapreview-header-wordmark-id"

  );
});


// Cypress.Commands.add("continueReadBtn", () => {
//   cy.get("body > div.wp-popup > div > div.wikipediapreview-footer > span");
// });

Cypress.Commands.add("popUpBoxFooterImg1", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(1)",
    { timeout: 5000 }
  );
});

Cypress.Commands.add("popUpBoxFooterImg2", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(2)",
    { timeout: 5000 }
  );
});

Cypress.Commands.add("popUpBoxFooterImg3", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(3)",
    { timeout: 5000 }
  );
});

// Cypress.Commands.add("readMoreBtn", () => {
//   cy.get("body > div.wp-popup > div > div.wikipediapreview-footer > a");
// });

Cypress.Commands.add("popUpBoxCloseBtn", () => {
  cy.get(
    "body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-closebtn"
  );
});
Cypress.Commands.add("popUpBoxFoooterLink", () => {
  cy.get(
    "body > div.wp-popup > div.wikipediapreview > div.wikipediapreview-footer  > a"
  );
});
