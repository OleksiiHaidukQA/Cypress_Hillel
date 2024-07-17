const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    retries: {
      runMode: 1, //without UI
      openMode: 1 //with UI
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
