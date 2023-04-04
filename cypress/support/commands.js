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
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (email, password) => {
  // membuka halaman login
  cy.visit('http://localhost:3001/login');

  // mengisi email
  cy.get('input[placeholder=Email]').type(email);
  // mengisi password
  cy.get('input[placeholder=Password]').type(password);

  // menekan tombol Login
  cy.get('button').contains(/^Login$/).click();

  // harus dialihkan ke homepage
  cy.url().should('include', '/threads');

  // memverifikasi bahwa elemen yang berada di homepage ditampilkan ketika user login
  cy.get('button').contains('Logout').should('be.visible');
});
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
