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

Cypress.Commands.add('addCar', (carDetails) => {
  cy.intercept('POST', '/api/cars').as('createCar');
  
  cy.get('.btn.btn-primary').first().click(); // Клик только на первый найденный элемент
  cy.get('#addCarBrand').select(carDetails.brand);
  cy.get('#addCarModel').select(carDetails.model);
  cy.get('input[name="mileage"]').type(carDetails.mileage);
  cy.get('.modal-footer > .btn-primary').click();

  // Ждем завершения запроса и возвращаем carId
  cy.wait('@createCar').then((interception) => {
    expect(interception.response.statusCode).to.eq(201);
    const carId = interception.response.body.id;
    cy.wrap(carId);
  });
});

Cypress.Commands.add('deleteCar', (carId) => {
  cy.request({
    method: 'DELETE',
    url: `https://qauto.forstudy.space/api/cars/${carId}`,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add('createExpense', (carId, expense) => {
  cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/expenses',
    headers: {
      'Authorization': `Bearer ${Cypress.env('token')}`
    },
    body: {
      carId: carId,
      liters: expense.liters,
      totalCost: expense.totalCost,
      pricePerLiter: expense.pricePerLiter
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body;
  });
});