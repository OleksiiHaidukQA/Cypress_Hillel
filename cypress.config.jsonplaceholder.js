import { defineConfig } from "cypress";

export default defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1000,
  //baseUrl: 'https://example.com'
  //blockHosts: ['*.google.com'],
  //chromeWebSecurity: false,
  //screenshotsFolder: 'screenshots',
  //videosFolder: 'video',
  video: false,
  //responseTimeout: 30000,
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    retries: {
      runMode: 1, //without UI
      openMode: 1 //with UI
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
}});
