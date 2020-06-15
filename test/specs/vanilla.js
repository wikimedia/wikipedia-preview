// Login Form - Selenium Example Script
// see https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs for details
// runs test against http://crossbrowsertesting.github.io/login-form.html
var cbt = require('cbt_tunnels');
// Require chai.js expect module for assertions
const assert = require('assert');
var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var request = require('request');
var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';

var username = 'jpita-ctr@wikimedia.org'; //replace with your email address 
var authkey = process.env.CBTKEY; //replace with your authkey 
var configObj = {
    authkey: authkey,
    username: username,
}
var caps = {
    'name': 'Login Form Example',
    'build': '1.0',
    'browserName': 'Chrome',
    'version': '72',
    'platform': 'Windows 10',
    'screenResolution': '1366x768',
    'record_video': 'true',
    'record_network': 'false'};

caps.username = username;
caps.password = authkey;

var sessionId = null;


console.log('Connection to the CrossBrowserTesting remote server');
async function login(){
    try{
    var driver = new webdriver.Builder()
                .usingServer(remoteHub)
                .withCapabilities(caps)
                .build();


    console.log('Waiting on the browser to be launched and the session to start');

    await driver.getSession().then(function(session){
        sessionId = session.id_; //need for API calls
        console.log('Session ID: ', sessionId); 
        console.log('See your test run at: https://app.crossbrowsertesting.com/selenium/' + sessionId)
    });

    //load your URL
    await driver.get('http://localhost:8080');

    await driver.getTitle().then(function(title) {
        console.log("The title is: " + title)
    });

    //take snapshot via cbt api
    await driver.takeSnapshot();
 
     //find checkout and click it 
    // await driver.findElement(webdriver.By.id("username")).sendKeys("tester@crossbrowsertesting.com");

    // waits for tagged word
    var el = await driver.wait(webdriver.until.elementLocated(webdriver.By.css("div.content-en span:nth-child(1)")), 2000);
    // clicks tagged word
    await el.click()
    // waits for link to wikipedia
    var link = await driver.wait(webdriver.until.elementLocated(webdriver.By.css("body > div.wp-popup > div > div.wp-text-content > a")), 5000);
    // clicks the image
    console.log("clicks the image") 
    el = await driver.findElement(webdriver.By.className('wp-image'))
    await el.click()
    //take snapshot via cbt api
    await driver.takeSnapshot();
    // clicks the link
    console.log("clicks the link") 
    await link.click()
    // switches to new tab
    await driver.sleep(3000)
    await driver.getAllWindowHandles().then( array => driver.switchTo().window(array[1]))
    // await driver.switchTo().window((await driver).getAllWindowHandles[1])
    assert.equal(await driver.getTitle(), 'Cat - Wikipedia')

    //quit the driver
    await driver.quit()

    //set the score as passing
    setScore('pass').then(function(result){
        console.log('SUCCESS! set score to pass')
        cbt.stop()
    });
    }
    catch(e){
        webdriverErrorHandler(e, driver)
    }
   
}
cbt.start(configObj, function(err) {
    if (err) {
        console.error("Error starting: ", err);
        return err;
    }
    login();
})


//Call API to set the score
function setScore(score){
    return new Promise((resolve, fulfill)=> {
    var result = { error: false, message: null }

    if (sessionId){
        
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: {'action': 'set_score', 'score': score },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
            }
        })
        .auth(username, authkey);
    }
    else{
        result.error = true;
        result.message = 'Session Id was not defined';
        deferred.fulfill(result);
    }

    
        result.error ? fulfill('Fail') : resolve('Pass');
    });
}

//Call API to get a snapshot 
webdriver.WebDriver.prototype.takeSnapshot = function() {

    return new Promise((resolve, fulfill)=> { 
        var result = { error: false, message: null }
        
        if (sessionId){
            request.post(
                'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId + '/snapshots', 
                function(error, response, body) {
                    if (error) {
                        result.error = true;
                        result.message = error;
                    }
                    else if (response.statusCode !== 200){
                        result.error = true;
                        result.message = body;
                    }
                    else{
                        result.error = false;
                        result.message = 'success';
                    }
                }
            )
            .auth(username,authkey);
            
        }
        else{
            result.error = true;
            result.message = 'Session Id was not defined';
           
        }

            result.error ? fulfill('Fail') : resolve('Pass'); //never call reject as we don't need this to actually stop the test
    });
}

//general error catching function
function webdriverErrorHandler(err, driver){

    console.error('There was an unhandled exception! ' + err.message);

    //if we had a session, end it and mark failed
    if (driver && sessionId){
        driver.quit();
        setScore('fail').then(function(result){
            console.log('FAILURE! set score to fail')
            cbt.stop()
        })
    }
}