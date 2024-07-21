import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    env: {
      userEmail: 'oleksiihaidukqa@gmail.com',
      userPassword: 'Q123q123_'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
});