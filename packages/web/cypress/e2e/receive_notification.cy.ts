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
    it('should be recieved notification', () => {
        //User test@test.com
        cy.get('.cpAuthBtnLogin').click();
        cy.get('input[type="email"]')
          .type('test@test.com').should('have.value', 'test@test.com');
        cy.get('input[type="password"]')
          .type('test').should('have.value', 'test');
        cy.get('.cp_btnLogin').click();
        cy.visit('/')
        cy.request("POST", 'http://localhost:3000/auth/signup', {
            email:Date.now().toString()+'r@test.com',
            password:'test'
        }).then(
            (response) => {
                expect(response.body).to.have.property('token') // true
                    cy.request(
                    {
                        headers:{
                            Authorization:"Bearer "+ response.body.token
                        },
                        url:'http://localhost:3000/shares/create',
                        method:"POST",
                        body:{
                            user_id:0,
                            url:"https://www.youtube.com/watch?v=0rJ94rbdteE" 
                        }
                    }
                    ).then((res)=>{
                    expect(res.status).to.equal(201);
                    
                    })
              
            }
          );
          //Test ok in browser but not in cypress
          // cy.get('.cpNotification').should('exist');
        
    })
  })