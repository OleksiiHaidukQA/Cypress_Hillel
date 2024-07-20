class UserActions {
    registerUser() {
      const user = {
        firstName: 'Oleksii',
        lastName: 'Haiduk',
        email: Cypress.env('userEmail'),
        password: Cypress.env('userPassword')
      };

      cy.visit('/');
      cy.get('.btn.btn-outline-white.header_signup').click();
      cy.get('#signupName').type(user.firstName);
      cy.get('#signupLastName').type(user.lastName);
      cy.get('#signupEmail').type(user.email);
      cy.get('#signupPassword').type(user.password);
      cy.get('#signupRepeatPassword').type(user.password);
      cy.contains('button', 'Sign up').click();
    }

    loginUser() {
      cy.visit('/');
      cy.get('.btn.btn-outline-white.header_signin').click();
      cy.get('#signinEmail').type(Cypress.env('userEmail'));
      cy.get('input[name="password"]').type(Cypress.env('userPassword'), { log: false });
      cy.contains('button', 'Login').click();
      cy.url({ timeout: 10000 }).should('include', '/panel/garage'); // Убедитесь, что страница гаража загружена
    }
  }

  export const userActions = new UserActions();