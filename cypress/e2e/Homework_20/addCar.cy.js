import { garagePage } from './pageObjects/garagePage';
import { userActions } from './pageObjects/userActions';

describe('Add Car', () => {
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

    it('should add a car', () => {
        const carDetails = {
            brand: 'Porsche',
            model: 'Panamera',
            mileage: '7'
        };
        garagePage.addCar(carDetails);
        garagePage.verifyCarIsAdded(`${carDetails.brand} ${carDetails.model}`);
    });
});