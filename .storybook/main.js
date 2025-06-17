const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.js"
  ],

  "addons": [
    // add your addons here
  ],

  framework: {
    name: "@storybook/html-vite",
    options: {}
  },

  docs: {
    autodocs: false
  }
}
