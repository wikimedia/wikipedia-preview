const webpack = require('webpack')
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.js"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  framework: {
    name: "@storybook/html-vite",
    options: {}
  },

  docs: {
    autodocs: false
  }
}
