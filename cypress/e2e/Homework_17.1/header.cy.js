describe('Header and Footer Tests', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto2.forstudy.space/');
  });

  it('Should find all buttons in the header', () => {
    // Проверка кнопки "Home"
    cy.get('nav.header_nav .header-link').contains('Home').should('be.visible');

    // Проверка кнопки "About"
    cy.get('nav.header_nav .header-link').contains('About').should('be.visible');

    // Проверка кнопки "Contacts"
    cy.get('nav.header_nav .header-link').contains('Contacts').should('be.visible');

    // Проверка кнопки "Guest log in"
    cy.get('.header_right .header-link').contains('Guest log in').should('be.visible');

    // Проверка кнопки "Sign In"
    cy.get('.header_right .header_signin').contains('Sign In').should('be.visible');
  });

  it('Should find all links and buttons in the footer', () => {
    // Проверка ссылки на Facebook
    cy.get('[href="https://www.facebook.com/Hillel.IT.School"] > .socials_icon').should('be.visible');

    // Проверка ссылки на Telegram
    cy.get('[href="https://t.me/ithillel_kyiv"] > .socials_icon').should('be.visible');

    // Проверка ссылки на YouTube
    cy.get('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"] > .socials_icon').should('be.visible');

    // Проверка ссылки на Instagram
    cy.get('[href="https://www.instagram.com/hillel_itschool/"] > .socials_icon').should('be.visible');

    // Проверка ссылки на LinkedIn
    cy.get('[href="https://www.linkedin.com/school/ithillel/"] > .socials_icon').should('be.visible');

    // Проверка ссылки на сайт Hillel
    cy.get('a[href="https://ithillel.ua"]').should('have.attr', 'href', 'https://ithillel.ua').and('be.visible');

    // Проверка ссылки на email поддержки+
    cy.get('a[href="mailto:developer@ithillel.ua"]').should('have.attr', 'href', 'mailto:developer@ithillel.ua').and('be.visible');
  });

  it('Should verify email link', () => {
    // Проверка ссылки на почту
    cy.get('a[href="mailto:developer@ithillel.ua"]').should('have.attr', 'href', 'mailto:developer@ithillel.ua').and('be.visible');
  });

  it('Should open a new tab for the logo link', () => {
    // Проверка открытия новой вкладки по клику на логотип
    cy.get('a[href="https://ithillel.ua"]').should('have.attr', 'target', '_blank').and('be.visible');
    // Используем команду для проверки открытия новой вкладки
    cy.get('a[href="https://ithillel.ua"]').then(link => {
      const url = link.prop('href');
      cy.request(url).its('status').should('eq', 200);
    });
  });
});