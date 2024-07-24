// cypress/e2e/Homework_20/createExpense.cy.js
import { userActions } from './pageObjects/userActions';
import { garagePage } from './pageObjects/garagePage';

describe('Create Expense through API', () => {
  let carId;

  before(() => {
    // Логинимся и добавляем машину через UI
    cy.visit('/');
    cy.get('body').then($body => {
      if ($body.find('.btn.btn-outline-white.header_signup').length > 0) {
        userActions.registerUser();
      } else {
        userActions.loginUser();
        cy.getCookie('token').then((cookie) => {
          Cypress.env('token', cookie.value);
        });
      }
    });

    const carDetails = {
      brand: 'Porsche',
      model: 'Panamera',
      mileage: '7'
    };

    cy.addCar(carDetails).then((car) => {
      carId = car.id;
    });
  });

  it('should create an expense through API and validate response', () => {
    const expense = {
      liters: '40',
      totalCost: '50',
      pricePerLiter: '1.25'
    };

    cy.createExpense(carId, expense).then((createdExpense) => {
      expect(createdExpense.liters).to.eq(expense.liters);
      expect(createdExpense.totalCost).to.eq(expense.totalCost);
      expect(createdExpense.pricePerLiter).to.eq(expense.pricePerLiter);
    });
  });

  // Удаляем машину после тестов
  after(() => {
    if (carId) {
      cy.request({
        method: 'DELETE',
        url: `https://qauto.forstudy.space/api/cars/${carId}`,
        headers: {
          'Authorization': `Bearer ${Cypress.env('token')}`
        }
      });
    }
  });
});