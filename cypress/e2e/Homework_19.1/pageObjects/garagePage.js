class GaragePage {
  visit() {
    cy.visit('/panel/garage');
  }

  addCar({ brand, model, mileage }) {
    cy.get('.btn.btn-primary').click();
    cy.get('#addCarBrand').select(brand);
    cy.get('#addCarModel').select(model);
    cy.get('input[name="mileage"]').type(mileage);
    cy.get('.modal-footer > .btn-primary').click();
  }

  verifyCarIsAdded(car) {
    cy.contains(car).should('be.visible');
  }

  removeCar() {
    cy.get('.car_edit.btn.btn-edit').first().click();
    cy.get('.btn.btn-outline-danger').first().click();
  }

  getRandomOption(selector) {
    return cy.get(selector).then($select => {
      const options = $select.find('option');
      const randomIndex = Math.floor(Math.random() * options.length);
      return Cypress.$(options[randomIndex]).val();
    });
  }
}

export const garagePage = new GaragePage();