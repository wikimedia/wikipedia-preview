module.exports = {
    runner: 'local',
    hostname: "hub.crossbrowsertesting.com",
    port: 80,
    services: ['crossbrowsertesting'],
    user: process.env.CBT_USERNAME,// the email address associated with your CBT account
    key: process.env.CBTKEY,// find this under the "Manage Account page of our app"
    cbtTunnel: true,
    specs: [
        './test/e2e/specs/**/*.js'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 30000
    }
}