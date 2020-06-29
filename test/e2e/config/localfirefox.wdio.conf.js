exports.config = {
    runner: 'local',
    specs: [
        'test/e2e/specs/selenium.js'
    ],
    exclude: [
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'firefox',
    }],
    services: ['geckodriver'],
    logLevel: 'info',
    bail: 0,
    path: "/",
    baseUrl: 'https://wikimedia.github.io',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
