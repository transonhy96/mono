describe('Login spec', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    Cypress.Cookies.debug(true)
    cy.clearCookies()
    cy.intercept('https://www.youtube.com/*', req => req.destroy());
    cy.visit('/')
   
    

  })
  it('should be success', () => {
    cy.get('.cpAuthBtnLogin').click();
    cy.get('input[type="email"]')
      .type('test@test.com').should('have.value', 'test@test.com');
    cy.get('input[type="password"]')
      .type('test').should('have.value', 'test');
    cy.get('.cp_btnLogin').click();
    cy.url().should("be.equals",'http://localhost:8080/');
    cy.get('.cpBtnLogged').should('be.visible');
  })

  it('should be failed', () => {
    cy.get('.cpAuthBtnLogin').click();
    cy.get('input[type="email"]')
      .type('test@test.com').should('have.value', 'test@test.com');
    cy.get('input[type="password"]')
      .type('randompass').should('have.value', 'randompass');
    cy.get('.cp_btnLogin').click();
    cy.url().should("be.contains",'http://localhost:8080/login-error');
  })
})