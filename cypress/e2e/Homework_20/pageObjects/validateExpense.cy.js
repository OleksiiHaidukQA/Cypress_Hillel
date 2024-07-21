// cypress/e2e/Homework_20/validateExpense.cy.js
describe('Validate Expense through UI', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.btn.btn-outline-white.header_signin').click();
      cy.get('#signinEmail').type(`${Cypress.env('userEmail')}`);
      cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
      cy.contains('button', 'Login').click();
      cy.url({ timeout: 10000 }).should('include', '/panel/garage'); // Ensure the garage page is loaded
    });
  
    it('should find the car and validate expense', () => {
        cy.get(':nth-child(1) > app-car > .car > .car-heading > .car_actions > .car_add-expense').click();
        cy.get('#addExpenseLiters').type(40);
        cy.get('#addExpenseTotalCost').type(50);
        cy.get('.liters').should('have.text', '40');
        cy.get('.total-cost').should('have.text', '50');
        cy.get('.modal-footer > button').contains('Add').click({ force: true });
    });
  });