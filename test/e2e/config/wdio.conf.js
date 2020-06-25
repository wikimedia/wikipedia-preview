exports.config = {
    runner: 'local',
    hostname: "hub.crossbrowsertesting.com",
    port: 80,
    services: ['crossbrowsertesting'],
    user: process.env.CBT_USERNAME,// the email address associated with your CBT account
    key: process.env.CBTKEY,// find this under the "Manage Account page of our app"
    // cbtTunnel: true,
    specs: [
        './test/e2e/specs/**/*.js'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 30000
    },
    capabilities: [{
        name: 'wikipedia preview chrome on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'chrome',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    },{
        name: 'wikipedia preview edge on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'edge',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    },{
        name: 'wikipedia preview firefox on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'firefox',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    },{
        name: 'wikipedia preview internet explorer on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'internet explorer',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    },{
        name: 'wikipedia preview safari on: '+process.env.ENVIRONMENT,
        build: '1.0',
        platform: "Mac OSX 10.15",          // Gets latest version by default
        browserName: 'safari',     // To specify version, add version: "desired version"
        record_video: 'true',
        record_network: 'false'
    }]
}