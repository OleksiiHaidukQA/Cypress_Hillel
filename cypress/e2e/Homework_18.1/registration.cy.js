import { RegistrationSelectors } from './entities/registrationSelectors';
import { Errors } from './common/errors';
import { GenerateChars } from './utils/GeneratingChars';

describe('registration flow', () => {
    const generateChars = new GenerateChars();
    const urlMock = 'https://guest:welcome2qauto@qauto2.forstudy.space/';
    
    beforeEach(() => {
        cy.visit(urlMock);
        cy.get(RegistrationSelectors.registrationButton).should('be.visible').click();
    });

    it('registration process', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(RegistrationSelectors.name).type(nameMock);
        cy.get(RegistrationSelectors.lastName).type(nameMock);
        cy.get(RegistrationSelectors.email).type(emailMock);
        cy.get(RegistrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.repeatPassword).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.submit).click();
    });
    
    it('error while checking name', () => {
        cy.get(RegistrationSelectors.name).type('1');
        cy.get(RegistrationSelectors.lastName).focus();
        cy.get(RegistrationSelectors.invalidFeedback).contains(Errors.invalidName).should('be.visible');
        cy.get(RegistrationSelectors.invalidFeedback).contains(Errors.nameLength).should('be.visible');
    });

    it('error while checking last name', () => {
        cy.get(RegistrationSelectors.lastName).type('1');
        cy.get(RegistrationSelectors.name).focus();
        cy.get(RegistrationSelectors.invalidFeedback).contains(Errors.lastNameInvalid).should('be.visible');
    });

    it('error while name is empty', () => {
        cy.get(RegistrationSelectors.name).focus();
        cy.get(RegistrationSelectors.lastName).focus();
        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.nameRequired).should('be.visible');
        cy.get(RegistrationSelectors.submit).click({ force: true });
    });

    it('error while last name is empty', () => {
        cy.get(RegistrationSelectors.lastName).focus();
        cy.get(RegistrationSelectors.name).focus();
        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.lastNameRequired).should('be.visible');
        cy.get(RegistrationSelectors.submit).click({ force: true });
    });

    it('error while email is invalid', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const invalidEmail = 'invalidEmail';
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(RegistrationSelectors.name).type(nameMock);
        cy.get(RegistrationSelectors.lastName).type(nameMock);
        cy.get(RegistrationSelectors.email).type(invalidEmail);
        cy.get(RegistrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.repeatPassword).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.submit).click({ force: true });

        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.emailIsIncorrect).should('be.visible');
    });

    it('error while email is empty', () => {
        cy.get(RegistrationSelectors.email).focus();
        cy.get(RegistrationSelectors.password).focus();
        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.emailRequired).should('be.visible');
        cy.get(RegistrationSelectors.submit).click({ force: true });
    });

    it('error while password is invalid', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const invalidPassword = 'short1';

        cy.get(RegistrationSelectors.name).type(nameMock);
        cy.get(RegistrationSelectors.lastName).type(nameMock);
        cy.get(RegistrationSelectors.email).type(emailMock);
        cy.get(RegistrationSelectors.password).type(invalidPassword, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.repeatPassword).type(invalidPassword, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.submit).click({ force: true });

        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.passwordInvalid).should('be.visible');
    });

    it('error while password is empty', () => {
        cy.get(RegistrationSelectors.password).focus();
        cy.get(RegistrationSelectors.repeatPassword).focus();
        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.passwordRequired).should('be.visible');
        cy.get(RegistrationSelectors.submit).click({ force: true });
    });

    it('error while passwords do not match', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(RegistrationSelectors.name).type(nameMock);
        cy.get(RegistrationSelectors.lastName).type(nameMock);
        cy.get(RegistrationSelectors.email).type(emailMock);
        cy.get(RegistrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.repeatPassword).type('DifferentPassword1!', { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.submit).click({ force: true });
        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.passwordInvalid).should('be.visible');
    });

    it('error while re-enter password is empty', () => {
        const nameLength = 10;
        const nameMock = generateChars.getRandomName(nameLength);
        const emailMock = generateChars.getRandomEmail(nameLength);
        const passwordMock = generateChars.getRandomPassword(nameLength);

        cy.get(RegistrationSelectors.name).type(nameMock);
        cy.get(RegistrationSelectors.lastName).type(nameMock);
        cy.get(RegistrationSelectors.email).type(emailMock);
        cy.get(RegistrationSelectors.password).type(passwordMock, { sensitive: true, parseSpecialCharSequences: false });
        cy.get(RegistrationSelectors.repeatPassword).focus().blur();
        cy.get(RegistrationSelectors.submit).click({ force: true });

        cy.get(RegistrationSelectors.invalidFeedbackP).contains(Errors.passwordMatchRequired).should('be.visible');
    });
});