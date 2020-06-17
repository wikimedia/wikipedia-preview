const common = require('./wdio.common.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview firefox on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'firefox',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    }],
  }
  