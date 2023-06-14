describe('Create share spec', () => {
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
    it('should be not be enable without logging in', () => {
      cy.get('.cpBtnShare').should("not.exist");
    })
  
    it('should be failed  due to youtube url format', () => {
        cy.get('.cpAuthBtnLogin').click();
        cy.get('input[type="email"]')
          .type('test@test.com').should('have.value', 'test@test.com');
        cy.get('input[type="password"]')
          .type('test').should('have.value', 'test');
        cy.get('.cp_btnLogin').click();
        cy.get('.cpAuthBtnLogin').click();
        cy.get('.cpBtnShare').click();
        cy.get('input[name="url"]')
          .type('test@test.com').should('have.value', 'test@test.com');
        cy.get('.cpBtnShareSubmit').click(); 
        cy.get('input[name="url"]').should('have.value',"test@test.com")
    })

    it('should be create youtube share', () => {
        cy.get('.cpAuthBtnLogin').click();
        cy.get('input[type="email"]')
          .type('test@test.com').should('have.value', 'test@test.com');
        cy.get('input[type="password"]')
          .type('test').should('have.value', 'test');
        cy.get('.cp_btnLogin').click();
        cy.get('.cpAuthBtnLogin').click();
        cy.get('.cpBtnShare').click();
        cy.get('input[name="url"]')
          .type('https://www.youtube.com/watch?v=0rJ94rbdteE').should('have.value', 'https://www.youtube.com/watch?v=0rJ94rbdteE');
        cy.get('.cpBtnShareSubmit').click(); 
        cy.get('input[name="url"]').should('not.exist');
    })
  })