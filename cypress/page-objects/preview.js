export class Preview {

    // Wikipedia Preiew Span

    PreviewSpan () {
        return cy.get('span.wmf-wp-with-preview')
    }


    // Wikipedia Preiew Container

    Preview () {
        return cy.get('div.wp-popup  > div.wikipediapreview')
    }


    // Wikipedia Preiew Header

    Header () {
        return cy.get('div.wp-popup  > div.wikipediapreview > div.wikipediapreview-header')
    }

    HeaderImage () {
        return cy.get('div.wp-popup  > div.wikipediapreview > div.wikipediapreview-header').find('div.wikipediapreview-header-image')
    }

    HeaderWatermark () {
        return cy.get('div.wp-popup  > div.wikipediapreview > div.wikipediapreview-header').find('div.wikipediapreview-header-wordmark')
    }

    HeaderClosebtn () {
        return cy.get('div.wp-popup  > div.wikipediapreview > div.wikipediapreview-header').find('div[class="wikipediapreview-header-closebtn"]')
    }




    // Wikipedia Preiew Body

    Body () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-body')
    }

    BodyContent () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-body > p')
    }

    BodyGallery () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-body > div.wikipediapreview-gallery')
    }

    BodyMessage () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-body').find('div.wikipediapreview-body-message')
    }

    BodyAction () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-body').find('div.wikipediapreview-body-action > a')
    }




    //  Wikipedia Preview Footer

    Footer () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-footer')
    }

    FooterContiReading () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-footer').find('span[class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore"]')
    }

    FooterReadMore () {
        return cy.get('div.wp-popup > div.wikipediapreview > div.wikipediapreview-footer').find('a[class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki"]')
    }

    
    
}