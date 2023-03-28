describe('Login Test', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.fixture('login-details').then(function (data) {
      this.data = data;
    })
  });

  it('1. Check that user can login successfully with valid credentials', function () {
    const { username, password } = this.data.stdUser;
    cy.login(username, password);
    cy.get('#inventory_container').should('be.visible');
  });

  it('2. Check that user cannot login with incorrect credentials', function () {
    const { username, password } = this.data.invalidCredentials;
    cy.login(username, password);
    cy.get('[data-test="error"]').should('be.visible')
  });

  it('3. Check that user can be able to logout from Product page', function () {
    const { username, password } = this.data.stdUser;
    cy.login(username, password);
    cy.get('.bm-burger-button').click();
    cy.get('#logout_sidebar_link').click();
    cy.get('#login_button_container').should('be.visible')
  });

})



