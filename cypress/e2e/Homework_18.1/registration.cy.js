import { registrationSelectors } from './entities/registrationSelectors';
import { errors } from './common/errors';
import { GenerateChars } from './utils/GeneratingChars';

describe('registration flow', () => {
    const generateChars = new GenerateChars();
    
    beforeEach(() => {
        cy.visit('/');
        cy.get(registrationSelectors.registrationButton).should('be.visible').click();
    });

    it('registration process', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(registrationSelectors.name).type(nameMock);
        cy.get(registrationSelectors.lastName).type(nameMock);
        cy.get(registrationSelectors.email).type(emailMock);
        cy.get(registrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.repeatPassword).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.submit).click();
    });
    
    it('error while checking name', () => {
        cy.get(registrationSelectors.name).type('1');
        cy.get(registrationSelectors.lastName).focus();
        cy.get(registrationSelectors.invalidFeedback).contains(errors.invalidName).should('be.visible');
        cy.get(registrationSelectors.invalidFeedback).contains(errors.nameLength).should('be.visible');
    });

    it('error while checking last name', () => {
        cy.get(registrationSelectors.lastName).type('1');
        cy.get(registrationSelectors.name).focus();
        cy.get(registrationSelectors.invalidFeedback).contains(errors.lastNameInvalid).should('be.visible');
    });

    it('error while name is empty', () => {
        cy.get(registrationSelectors.name).focus();
        cy.get(registrationSelectors.lastName).focus();
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.nameRequired).should('be.visible');
        
    });

    it('error while last name is empty', () => {
        cy.get(registrationSelectors.lastName).focus();
        cy.get(registrationSelectors.name).focus();
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.lastNameRequired).should('be.visible');
        cy.get(registrationSelectors.submit).should('be.disabled');
    });

    it('error while email is invalid', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const invalidEmail = 'invalidEmail';
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(registrationSelectors.name).type(nameMock);
        cy.get(registrationSelectors.lastName).type(nameMock);
        cy.get(registrationSelectors.email).type(invalidEmail);
        cy.get(registrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.repeatPassword).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.submit).click({ force: true });
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.emailIsIncorrect).should('be.visible');
    });

    it('error while email is empty', () => {
        cy.get(registrationSelectors.email).focus();
        cy.get(registrationSelectors.password).focus();
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.emailRequired).should('be.visible');
        cy.get(registrationSelectors.submit).click({ force: true });
    });

    it('error while password is invalid', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const invalidPassword = 'short1';

        cy.get(registrationSelectors.name).type(nameMock);
        cy.get(registrationSelectors.lastName).type(nameMock);
        cy.get(registrationSelectors.email).type(emailMock);
        cy.get(registrationSelectors.password).type(invalidPassword, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.repeatPassword).type(invalidPassword, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.submit).click({ force: true });

        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.passwordInvalid).should('be.visible');
    });

    it('error while password is empty', () => {
        cy.get(registrationSelectors.password).focus();
        cy.get(registrationSelectors.repeatPassword).focus();
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.passwordRequired).should('be.visible');
        cy.get(registrationSelectors.submit).click({ force: true });
    });

    it('error while passwords do not match', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(registrationSelectors.name).type(nameMock);
        cy.get(registrationSelectors.lastName).type(nameMock);
        cy.get(registrationSelectors.email).type(emailMock);
        cy.get(registrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.repeatPassword).type('DifferentPassword1!', { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.submit).click({ force: true });
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.passwordInvalid).should('be.visible');
    });

    it('error while re-enter password is empty', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(registrationSelectors.name).type(nameMock);
        cy.get(registrationSelectors.lastName).type(nameMock);
        cy.get(registrationSelectors.email).type(emailMock);
        cy.get(registrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(registrationSelectors.repeatPassword).focus().blur();
        cy.get(registrationSelectors.submit).click({ force: true });
        cy.get(registrationSelectors.invalidFeedbackP).contains(errors.passwordMatchRequired).should('be.visible');
    });
});