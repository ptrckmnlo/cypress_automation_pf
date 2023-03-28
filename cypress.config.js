const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com/",
    pageLoadTimeout: 20000,
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
