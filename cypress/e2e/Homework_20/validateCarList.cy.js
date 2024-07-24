describe('Validate Car List', () => {
  let carId;

  before(() => {
    cy.visit('/');
    cy.get('.btn.btn-outline-white.header_signin').click();
    cy.get('#signinEmail').type(`${Cypress.env('userEmail')}`);
    cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
    cy.contains('button', 'Login').click();
    cy.url({ timeout: 10000 }).should('include', '/panel/garage');
    cy.getCookie('token').then((cookie) => {
      Cypress.env('token', cookie ? cookie.value : '');
      cy.addCar({ brand: 'Porsche', model: 'Panamera', mileage: '7' }).then((id) => {
        carId = id;
        cy.wrap(carId).as('carId');
      });
    });
  });

  it('should contain the created car', () => {
    cy.get('@carId').then(id => {
      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const car = response.body.cars ? response.body.cars.find((c) => c.id === id) : undefined;
        expect(car).to.not.be.undefined;
        expect(car.brand).to.eq('Porsche');
        expect(car.model).to.eq('Panamera');
      });
    });
  });

  after(() => {
    if (carId) {
      cy.log(`Deleting car with ID: ${carId}`);
      cy.deleteCar(carId);
    } else {
      cy.log('Car ID is undefined');
    }
  });
});