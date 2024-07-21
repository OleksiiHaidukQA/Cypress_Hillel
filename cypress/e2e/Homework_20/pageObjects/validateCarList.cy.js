describe('Validate Car List', () => {
    it('should contain the created car', () => {
      cy.request('GET', '/api/qauto.forstudy.space/api-docs/#/Cars/getCars').then((response) => {
        expect(response.status).to.eq(200);
        const car = response.body.find((c) => c.id === carId);
        expect(car).to.not.be.undefined;
        expect(car.brand).to.eq('Porsche');
        expect(car.model).to.eq('Panamera');
      });
    });
  });