describe('webdriver.io page', () => {

    beforeEach(async ()=>{
        await browser.url('http://localhost:8080/')
        const title = await browser.getTitle()
    })

    it.only('should open article on another tab', async () => {
        el = await $('div.content-en span:nth-child(1)')
        await el.click()
        el=await $('div.wp-text-content > div.wp-title')
        await el.click()
        el=await $('.wp-image')
        await el.click()
        el=await $('a.wp-link')
        await el.click()
        await browser.switchWindow("en.wikipedia.org/wiki/Cat")
    })
})
