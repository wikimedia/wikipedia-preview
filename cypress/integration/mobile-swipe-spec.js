import { Preview } from '../page-objects/preview-page'
import { Gallery } from '../page-objects/gallery-page'

const preview = new Preview()
const gallery = new Gallery()

describe( 'Check the Gallery Pages in Mobile View', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToMobileTestPage()
	} )

	it( 'Check the Scrollable of Gallery in Expanded Mode', () => {
		// Open the Preview
		preview.getPreviewSpan().eq( 4 ).click()
		// Check for the Continue Reading exist
		preview.getFooterContinueReading().then( res => {
			if ( res.css( 'display' ) !== 'none' ) {
				preview.getFooterContinueReading().click()
			}
		} )
		preview.getHeaderImage().its( 'length' ).then( () => {
			// Get the Images in View
			preview.getBodyGallery().scrollIntoView().should( 'be.visible' )
			// Scrolling the images within Gallery in Expanded Mode
			// preview.getBodyGallery().swipe({delay: 2000,draw:true},'bottom-right','bottom-left')
			preview.getBodyGallery().scrollTo( 'right', { duration: 3000 } )
		} )

		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()
	} )

	it( 'Check the Gallery Image Caption Scrollable', () => {
		// Open the Preview
		preview.getPreviewSpan().eq( 4 ).click()
		// Check for the Continue Reading exist
		preview.getFooterContinueReading().then( res => {
			if ( res.css( 'display' ) !== 'none' ) {
				preview.getFooterContinueReading().click()
			}
		} )
		const i = 1
		// Check if the Images exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery
			preview.getBodyGalleryImages().eq( 1 ).click()
			// Check the Gallery Page
			gallery.checkGalleryPage( i )
			// Check if the Caption Bar exist
			gallery.getGalleryCaptionBar( i ).its( 'length' ).then( len => {
				if ( len > 0 ) {
					// Scroll the Caption Text
					// gallery.getGalleryCaption( i ).swipe( 'bottom', 'center' )
					gallery.getGalleryCaptionText( i ).scrollTo( 'bottom', { duration: 3000 } )
				}
			} )
		} )
	} )

} )
