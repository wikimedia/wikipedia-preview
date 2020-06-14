const assert = require('assert')

describe('wikipedia preview - ', () => {

    beforeEach( async ()=>{
        await browser.url('http://localhost:8080')
    })

    it('should open article on another tab', async (done) => {
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
})
