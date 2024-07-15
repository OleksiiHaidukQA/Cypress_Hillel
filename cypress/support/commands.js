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