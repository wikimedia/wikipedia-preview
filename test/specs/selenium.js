const assert = require('assert')
const axios = require("axios");

describe('wikipedia preview - ', () => {

    beforeEach( async ()=>{
        await browser.url('http://localhost:8080')
    })

    it('should open article on another tab', async (done) => {
        console.log("GETSESSION+  "+browser.sessionId)
        el = await $('div.content-en span:nth-child(1)')
        await el.click()
        el=await $('div.wp-text-content > div.wp-title')
        await el.click()
        el=await $('.wp-image')
        await el.click()
        el=await $('a.wp-link')
        await el.click()
        await browser.switchWindow("en.wikipedia.org/wiki/Cat")
        assert.strictEqual(await browser.getTitle(), 'Cat - Wikipedia')
    })
    
    afterEach(async function(){
        var score=this.currentTest.state.split('ed')[0]
        try {
            await axios.put(
                'https://crossbrowsertesting.com/api/v3/selenium/' + browser.sessionId,
                {'action': 'set_score', 'score': score },
                {
                    auth: {username: browser.config.user, 
                           password: browser.config.key
                        }
                }
        )
          } catch (error) {
            console.error("ERRROOOORRR"+error);
          }
    });
})
