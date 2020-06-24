const common = require('./common.wdio.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview chrome on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'chrome',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    }],
  }
  