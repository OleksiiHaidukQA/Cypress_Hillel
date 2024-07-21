// cypress/e2e/Homework_20/createExpense.cy.js
describe('Create Expense through API', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.btn.btn-outline-white.header_signin').click();
        cy.get('#signinEmail').type(`${Cypress.env('userEmail')}`);
        cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
        cy.contains('button', 'Login').click();
        cy.url({ timeout: 10000 }).should('include', '/panel/garage'); // Ensure the garage page is loaded
      });
    let carId;
  
    before(() => {
      cy.addCar({ brand: 'Porsche', model: 'Panamera', mileage: '7' }).then((car) => {
        carId = car.id;
      });
    });
  
    it('should create an expense and validate response', () => {
      const expense = {
        liters: '40',
        totalCost: '50',
        pricePerLiter: '1.25'
      };
  
      cy.createExpense(carId, expense).then((expense) => {
        expect(expense.liters).to.eq('40');
        expect(expense.total_cost).to.eq('50');
      });
    });
  
//     after(() => {
//       cy.request('DELETE', `/api/cars/${carId}`);
//     });
});