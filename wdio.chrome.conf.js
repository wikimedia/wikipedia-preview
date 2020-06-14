exports.config = {
    runner: 'local',
    hostname: "hub.crossbrowsertesting.com",
    port: 80,
    services: ['crossbrowsertesting'],
    user: 'jpita-ctr@wikimedia.org',// the email address associated with your CBT account
    key: process.env.CBTKEY,// find this under the "Manage Account page of our app"
    cbtTunnel: true,
    specs: [
        './test/specs/**/*.js'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    capabilities: [{
        name: 'wikipedia preview chrome',
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'chrome',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    }],
  }
  