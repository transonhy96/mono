/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Homepage', () => {
    it('should navigate to the home page', () => {
      // Start from the index page
      cy.visit('http://localhost:8080/')
      cy.get('.cpHome').contains('Home')
    })
  })
  
  // Prevent TypeScript from reading file as legacy script
  export {}