describe('Validate Expense through UI', () => {
    let carId;
  
    before(() => {
      // Логин и добавление машины, чтобы получить carId
      cy.visit('/');
      cy.get('.btn.btn-outline-white.header_signin').click();
      cy.get('#signinEmail').type(`${Cypress.env('userEmail')}`);
      cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
      cy.contains('button', 'Login').click();
      cy.url({ timeout: 10000 }).should('include', '/panel/garage');
      cy.getCookie('token').then((cookie) => {
        Cypress.env('token', cookie ? cookie.value : '');
        cy.addCar({ brand: 'Porsche', model: 'Panamera', mileage: '7' }).then(() => {
          // Найдем добавленную машину и сохраним ее ID
          cy.get('.car .car-heading').contains('Porsche Panamera')
            .parents('.car')
            .find('.car_edit.btn.btn-edit')
            .should('exist')
            .click();
          cy.get('input[name="car_id"]').should('exist').invoke('val').then((val) => {
            carId = val;
            cy.wrap(carId).as('carId');
            cy.log(`Car ID saved: ${carId}`);
            // Закроем модальное окно
            cy.get('.modal-footer > .btn-secondary').click();
          });
        });
      });
    });
  
    it('should find the car and validate expense', () => {
      cy.get('@carId').then(id => {
        cy.get(':nth-child(1) > app-car > .car > .car-heading > .car_actions > .car_add-expense').click();
        cy.get('#addExpenseLiters').type('40');
        cy.get('#addExpenseTotalCost').type('50');
        cy.get('.liters').should('have.text', '40');
        cy.get('.total-cost').should('have.text', '50');
        cy.get('.modal-footer > button').contains('Add').click({ force: true });
      });
    });
  
    after(() => {
      cy.get('@carId').then(id => {
        cy.deleteCar(id);
      }).then((err) => {
        cy.log('Error getting carId:', err);
      });
    });
  });