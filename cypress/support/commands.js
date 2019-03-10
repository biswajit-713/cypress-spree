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
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress command to login to spree
Cypress.Commands.add('login',(email, password) => {
    cy.get('#link-to-login').find('a').click();

    cy.get('#spree_user_email').type(email);
    cy.get('#spree_user_password').type(password);
    cy.get("input[name='commit']").click();
    cy.get('.alert-success').should('have.text', 'Logged in successfully');

}); 