// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('login', (username, password) => { 
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password, {log: false});
    cy.get('[data-test="login-button"]').click();
})

Cypress.Commands.add('clickBtn', (el) => {
    cy.get(el).click();
})

Cypress.Commands.add('addToCartBtn', () => {
    cy.get('.btn_inventory');
})

Cypress.Commands.add('addAllItems', () => {
    cy.addToCartBtn().each(($button) => {
        cy.wrap($button).click();
    });
})

Cypress.Commands.add('removeAllItems', () => {
    cy.get('.cart_button').each(($button) => {
        cy.wrap($button).click();
    });
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })