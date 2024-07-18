import { Preview } from '../page-objects/preview-page'
import { Gallery } from '../page-objects/gallery-page'

const preview = new Preview()
const gallery = new Gallery()

describe( 'Check the Gallery Pages in Mobile View', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToMobileTestPage()
	} )

	it( 'Check the Gallery Pages Movement by Swiping', () => {
		// Open the Preview
		preview.getPreviewSpan().first().trigger( 'pointerenter', { pointerType: 'touch' } )
		const i = 0
		// Check if the Images exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery
			preview.getBodyGalleryImages().first().click()
			// Check the Gallery Page
			gallery.checkMobileGalleryPage( i )
			// Swipe to go Next
			gallery.getGalleryImage( i ).swipe( 'right', 'left' )
			// Swipe to go Previous
			gallery.getGalleryImage( i + 1 ).swipe( 'left', 'right' )
		} )
	} )

	it( 'Check the Gallery Image Caption by Clicking on Caption Bar', () => {
		// Open the Preview
		preview.getPreviewSpan().eq( 4 ).click()
		const i = 1
		// Check if the Images exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery
			preview.getBodyGalleryImages().eq( 1 ).click()
			// Check the Gallery Page
			gallery.checkMobileGalleryPage( i )
			// Check if the Caption Bar exist
			gallery.getGalleryCaption( i ).its( 'length' ).then( ( len ) => {
				if ( len > 0 ) {
					// Scroll the Caption Text
					gallery.getGalleryCaption( i ).click()
				}
			} )
		} )
	} )

} )
