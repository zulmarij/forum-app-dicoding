/**
 * - Threads spec
 *   - should display threads page correctly
 *   - should display threads page correctly when the user is login
 */

describe('Threads spec', () => {
  it('should display threads page correctly', () => {
    cy.visit('http://localhost:3000/threads');
    // memverifikasi elemen yang harus tampak pada halaman threads
    cy.get('h1').should('contain', 'All Categories');
    cy.get('h1').should('contain', 'Threads');
  });

  it('should display threads page correctly when the user is login', () => {
    cy.login('testemail@gmail.com', 'testpassword');
    cy.visit('http://localhost:3000/threads');
    // memverifikasi elemen yang harus tampak pada halaman threads ketika login
    cy.get('h1').should('contain', 'All Categories');
    cy.get('h1').should('contain', 'Threads');
    cy.get('label[for="create-thread-modal"]').should('be.visible');
  });
});
