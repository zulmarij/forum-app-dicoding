/**
 * - Leaderboards spec
 *   - should display leaderboards page correctly
 */

describe('Leaderboards spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/leaderboards');
  });

  it('should display leaderboards page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman leaderboards
    cy.get('h1').should('contain', 'Leaderboards');
  });
});
