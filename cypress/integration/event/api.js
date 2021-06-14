import { Preview } from '../../page-objects/preview'
import { requestPagePreview } from '../../../src/api'
import { msg } from '../../../src/i18n'
import { isOnline, getAnalyticsQueryParam } from '../../../src/utils'

const preview = new Preview()


describe('Check the Preview layout based on API result', () => {
    
    beforeEach('Open the English Page', () => {
        cy.navigateToHomePage('/articles/english.html')
        cy.wait(2000)
    })

    
    it.only('Check the Preview Layout', () => {

        preview.PreviewSpan().first().as('title').click()
        cy.wait(2000)

        preview.Preview().then( tag => {

            // Get the language used
            const lang = tag.attr('lang')
            // Get the direction of Content
            const dir =  tag.attr('dir').toLowerCase()
            
            cy.get('@title').then(ele => {
                const title = ele.text()
                
                const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent( title )}?${getAnalyticsQueryParam()}`
                
                // Request for the data based on language and title
                if(!isOnline)
                    cy.CheckPreviewOffline()

                else {
                    cy.request(url).then((res) => {
                        const data = res.body
                        // cy.log(data.titles.canonical,data.extract_html,data.dir, data.type)

                        const imgUrl = data.thumbnail ? data.thumbnail.source : null

                        expect(data.dir).to.equal(dir)

                        if(data.type == 'standard' && imgUrl){
                            cy.CheckPreviewStandardWithImage()
                        }
                        else if(data.type == 'standard'){
                            cy.CheckPreviewStandardWithImage()
                        }
                        else if(data.type == 'disambiguation'){
                            cy.CheckPreviewDisambiguation()
                        }
                        else 
                            cy.CheckPreviewError()
                        
                    })
                }
                
            })

        })

    })


       

})

