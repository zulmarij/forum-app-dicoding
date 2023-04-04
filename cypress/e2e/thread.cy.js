/**
 * - Thread spec
 *   - should display thread page correctly
 */

describe('Thread spec', () => {
  it('should display thread page correctly', () => {
    cy.visit('http://localhost:3000/thread/thread-08_nUU2fhu1P5nre');

    // memverifikasi elemen yang harus tampak pada halaman thread
    cy.get('h1').should('contain', 'COMMENT');
  });

  it('should display thread page correctly when the user is login', () => {
    cy.login('testemail@gmail.com', 'testpassword');
    cy.visit('http://localhost:3000/thread/thread-08_nUU2fhu1P5nre');

    // memverifikasi elemen yang harus tampak pada halaman thread ketika login
    cy.get('h1').should('contain', 'COMMENT');
    cy.get('button')
      .contains(/^Post Comment$/)
      .should('be.visible');
  });
});
