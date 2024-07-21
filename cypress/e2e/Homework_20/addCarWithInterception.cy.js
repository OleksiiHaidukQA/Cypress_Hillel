// cypress/e2e/Homework_20/addCarWithInterception.cy.js
describe('Add Car with Interception', () => {
    let carId;
  
    beforeEach(() => {
      cy.visit('/');
      cy.get('.btn.btn-outline-white.header_signin').click();
      cy.get('#signinEmail').type(`${Cypress.env('userEmail')}`);
      cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
      cy.contains('button', 'Login').click();
      cy.url({ timeout: 10000 }).should('include', '/panel/garage'); 
    });
  
    it('should add a car and validate API response', () => {
      const carDetails = {
        brand: 'Porsche',
        model: 'Panamera',
        mileage: '7'
      };
  
      cy.intercept('POST', '/api/cars').as('createCar');
  
      cy.contains('button', 'Add car').click();
      cy.get('#addCarBrand').select(carDetails.brand);
      cy.get('#addCarModel').select(carDetails.model);
      cy.get('#addCarMileage').type(carDetails.mileage);
      cy.get('.modal-footer > .btn-primary').click();
  
      cy.wait('@createCar').then((interception) => {
        assert.equal(interception.response.statusCode, 201, 'Status code is 201');
        carId = interception.response.body.id;
      });
    });
  
    // afterEach(() => {
    //   if (carId) {
    //     cy.request('DELETE', `https://qauto2.forstudy.space/api/cars/${carId}`);
    //   }
    // });
  });