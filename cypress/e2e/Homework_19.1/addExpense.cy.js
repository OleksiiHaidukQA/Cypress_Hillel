import { expensesPage } from './pageObjects/expensesPage';
import { userActions } from './pageObjects/userActions';

describe('Add Fuel Expense', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body').then($body => {
      if ($body.find('.btn.btn-outline-white.header_signup').length > 0) {
        userActions.registerUser();
      } else {
        userActions.loginUser();
      }
    });
  });

  it('should add a fuel expense', () => {
    const expense = {
      liters: '40',
      totalCost: '50'
    };
    expensesPage.addFuelExpense(expense);
  });
});