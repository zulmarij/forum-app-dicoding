/**
 * - Leaderboards spec
 *   - should display leaderbords page correctly
 */

describe('Leaderboards spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/leaderbords');
  });

  it('should display leaderbords page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman leaderboards
    cy.get('h1').should('contain', 'Leaderboards');
  });
});
