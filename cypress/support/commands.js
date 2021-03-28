Cypress.Commands.add('titleCheck', () => {
    cy.get('body > div.container > div.title > p')
})

Cypress.Commands.add('para1', () => {
    cy.get('body > div.container > div.content > p:nth-child(1)')  //paragraph 1
})

Cypress.Commands.add('para2', () => {
    cy.get('body > div.container > div.content > p:nth-child(2)')  //paragraph 2
})

Cypress.Commands.add('para3', () => {
    cy.get('body > div.container > div.content > p:nth-child(3)') //paragraph 3
})

Cypress.Commands.add('para4', () => {
    cy.get('body > div.container > div.content > p:nth-child(4)') //paragraph 3
})

Cypress.Commands.add('coverImage', () => {
    cy.get('body > div.container > div.cover',{timeout:5000})
})

Cypress.Commands.add('pageHeader', () => {
    cy.get('body > a > div')
})

Cypress.Commands.add('previewBox', () => {
    cy.get('body > div.wp-popup')
})

Cypress.Commands.add('previewBoxHeaderImg', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-image',{timeout:5000})
})

Cypress.Commands.add('continueReadBtn', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-footer > span')
})

Cypress.Commands.add('previewBoxFooterImg1', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(1)',{timeout:5000})
})

Cypress.Commands.add('previewBoxFooterImg2', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(2)',{timeout:5000})
})

Cypress.Commands.add('previewBoxFooterImg3', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-body > div > div > div:nth-child(3)',{timeout:5000})
})

Cypress.Commands.add('pageFooter', () => {
    cy.get('body > div.footer')
})

Cypress.Commands.add('readMoreBtn', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-footer > a')
})

Cypress.Commands.add('previewBoxCloseBtn', () => {
    cy.get('body > div.wp-popup > div > div.wikipediapreview-header > div.wikipediapreview-header-closebtn')
})






