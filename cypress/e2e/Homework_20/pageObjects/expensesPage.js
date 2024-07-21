class ExpensesPage {
    visit() {
      cy.visit('/panel/expenses');
    }
  
    addFuelExpense(expense) {
      cy.get(':nth-child(1) > app-car > .car > .car-heading > .car_actions > .car_add-expense').click();
      cy.get('#addExpenseLiters').type(expense.liters);
      cy.get('#addExpenseTotalCost').type(expense.totalCost);
      cy.get('.modal-footer > .btn-primary').click();
    }
  
    verifyExpenseIsAdded(expense) {
      cy.contains(expense.date).should('be.visible');
    }
  }
  
  export const expensesPage = new ExpensesPage();