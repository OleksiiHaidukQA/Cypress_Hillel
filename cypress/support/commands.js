Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://guest:welcome2qauto@qauto2.forstudy.space/');
    cy.get('.header_signin').click();
    cy.get('#email').type(email);
    cy.get('#password').type(password, { sensitive: true });
    cy.get('.login-button').click();
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }
    return originalFn(element, text, options);
});

// cypress/support/commands.js
Cypress.Commands.add('createExpense', (carId, expense) => {
    cy.request('POST', '/api/cars', {
      car_id: carId,
      liters: expense.liters,
      total_cost: expense.totalCost,
      date: Cypress.moment().format('YYYY-MM-DD'),
      price_per_liter: expense.pricePerLiter
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
  });

  Cypress.Commands.add('addCar', (carDetails) => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/cars',
      body: {
        brand: carDetails.brand,
        model: carDetails.model,
        mileage: carDetails.mileage
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Валидация ответа
      expect(response.status).to.eq(200);
      return response.body.data;
    });
  });