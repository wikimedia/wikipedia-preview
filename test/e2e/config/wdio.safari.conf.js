const common = require('./wdio.common.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview safari on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Mac OSX 10.15",          // Gets latest version by default
        browserName: 'safari',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    }],
  }
  