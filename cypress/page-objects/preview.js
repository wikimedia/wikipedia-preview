export class Preview {

	// Wikipedia Preiew Span

	getPreviewSpan() {
		return cy.get( 'span.wmf-wp-with-preview' )
	}

	// Wikipedia Preiew Container

	getPreview() {
		return cy.get( 'div.wikipediapreview' )
	}

	getMobPreview() {
		return cy.get( 'div.wikipediapreview' )
	}

	getMobBackgroundScreen() {
		return cy.get( '.wp-dark-screen' )
	}
	// Wikipedia Preiew Header

	getHeader() {
		return cy.get( 'div.wikipediapreview-header' )
	}

	getHeaderImage() {
		return cy.get( 'div.wikipediapreview-header-image' )
	}

	getHeaderWatermark() {
		return cy.get( 'div.wikipediapreview-header-wordmark' )
	}

	getHeaderClosebtn() {
		return cy.get( 'div.wikipediapreview-header-closebtn' )
	}

	// Wikipedia Preiew Body

	getBody() {
		return cy.get( 'div.wikipediapreview-body' )
	}

	getBodyContent() {
		return cy.get( 'div.wikipediapreview-body > p' )
	}

	getBodyGallery() {
		return cy.get( 'div.wikipediapreview-gallery-row' )
	}

	getBodyGalleryImages() {
		return cy.get( 'div.wikipediapreview-gallery-image' )
	}

	getBodyMessage() {
		return cy.get( 'div.wikipediapreview-body-message' )
	}

	getBodyAction() {
		return cy.get( 'div.wikipediapreview-body-action > a' )
	}

	//  Wikipedia Preview Footer

	getFooter() {
		return cy.get( 'div.wikipediapreview-footer' )
	}

	getFooterContiReading() {
		return cy.get( 'span[class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readmore"]' )
	}

	getFooterReadMore() {
		return cy.get( 'a[class="wikipediapreview-footer-cta wikipediapreview-footer-cta-readonwiki"]' )
	}

}
