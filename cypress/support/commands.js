import {Homepage} from "../integration/pageObject/HomePage"
const homepage = new Homepage()


 Cypress.Commands.add("openingArticle", (articleName) => { 
    cy.get('div.title').each(($el,index,$list) => {
        if($el.text().includes(articleName))
        {
            cy.get('div.title').eq(index).click()
            homepage.getHomePage("/")
            // cy.go('back')
        }
    })
 })
