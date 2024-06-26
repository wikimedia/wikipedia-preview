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

		// Get the Images in View
		preview.getBodyGallery().scrollIntoView().should( 'be.visible' )
		// Scrolling the images within Gallery in Expanded Mode
		// preview.getBodyGallery().swipe({delay: 2000,draw:true},'bottom-right','bottom-left')
		preview.getBodyGallery().scrollTo( 'right', { duration: 3000 } )

		// Closes the Mobile Preview
		preview.getHeaderClosebtn().click()
	} )

	it( 'Check the Gallery Image Caption Scrollable', () => {
		// Open the Preview
		preview.getPreviewSpan().eq( 4 ).click()
		const i = 1
		// Check if the Images exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery
			preview.getBodyGallery().scrollIntoView().should( 'be.visible' )
			preview.getBodyGalleryImages().eq( 1 ).click()
			// Check the Gallery Page
			gallery.checkMobileGalleryPage( i )
			// Check if the Caption Text exist
			gallery.getGalleryCaption( i ).its( 'length' ).then( ( len ) => {
				if ( len > 0 ) {
					// Scroll the Caption Text
					// gallery.getGalleryCaption( i ).swipe( 'bottom', 'center' )
					gallery.getGalleryCaption( i ).scrollTo( 'bottom', { duration: 3000 } )
				}
			} )
		} )
	} )

} )
