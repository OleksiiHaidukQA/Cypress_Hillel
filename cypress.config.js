const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1980,
  viewportHeight: 3000,
  //baseUrl: 'https://example.com'
  //blockHosts: ['*.google.com'],
  //chromeWebSecurity: false,
  //screenshotsFolder: 'screenshots',
  //videosFolder: 'video',
  video: false,
  //responseTimeout: 30000,
  e2e: {
    retries: {
      runMode: 1, //without UI
      openMode: 1 //with UI
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
