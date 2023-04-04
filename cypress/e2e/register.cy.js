/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display login page when email is not already taken
 */

const dateNow = Date.now();

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman register
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('should display alert when name is empty', () => {
    // klik tombol register tanpa mengisi name
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    // mengisi name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);

    // klik tombol register tanpa mengisi email
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // mengisi email
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`);

    // klik tombol register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email is already taken', () => {
    // mengisi name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // mengisi email yang udah terdaftar
    cy.get('input[placeholder="Email"]').type('testemail@gmail.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`);

    // menekan tombol register
    cy.get('button').contains(/^Register$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should display login page when email is not already taken', () => {
    // mengisi name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // mengisi email
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`);
    // mengisi password
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`);

    // menekan tombol register
    cy.get('button').contains(/^Register$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('button').contains('Login').should('be.visible');
  });
});
