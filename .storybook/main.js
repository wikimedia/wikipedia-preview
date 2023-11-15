const webpack = require('webpack')
const path = require('path');

// const custom = require('../webpack.config.js')(null, {mode: 'development'});

module.exports = {
  "stories": [
    "../src/**/*.stories.js"
  ],

  // webpackFinal: (config) => {
  //   return {
  //     ...config,
  //     plugins: [
  //       ...config.plugins,
  //       new webpack.DefinePlugin( {
  //         APP_VERSION: '"(mock app version)"',
  //         GIT_HASH: '"(mock git hash)"'
  //       } ) ],
  //     module: {
  //       ...config.module,
  //       rules: custom.module.rules
  //     }
  //   };
  // },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  framework: {
    name: "@storybook/html-vite",
    options: {}
  },

  docs: {
    autodocs: true
  }
}
