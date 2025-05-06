
  const { defineConfig } = require('cypress');
  
  module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
      e2e: {
          baseUrl: 'https://staging.trymima.com/',
          defaultCommandTimeout: 10000,
          viewportHeight: 960,
          viewportWidth: 1530,
          chromeWebSecurity: false,
          setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
          },
      },
  });
      