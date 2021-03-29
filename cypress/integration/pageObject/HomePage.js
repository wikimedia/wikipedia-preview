export class Homepage {
    getHomePage(){
    return cy.visit('http://localhost:8080')
}
}