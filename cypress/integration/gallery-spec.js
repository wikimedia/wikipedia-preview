import { Preview } from '../page-objects/preview-page'
import { Gallery } from '../page-objects/gallery-page'

const preview = new Preview()
const gallery = new Gallery()

describe( 'Check the Gallery Pages ', () => {

	beforeEach( 'Open the Test Page', () => {
		cy.navigateToTestPage()
	} )

	it( 'Check the Gallery Pages', () => {
		// Open the Preview
		preview.getPreviewSpan().first().click()
		// Check for the Continue Reading exist
		preview.getFooterContinueReading().then( res => {
			if ( res.css( 'display' ) !== 'none' ) {
				preview.getFooterContinueReading().click()
			}
		} )
		const i = 0
		// Check if the Images exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery and Close it
			preview.getBodyGalleryImages().first().click()
			// Check the Gallery Page
			gallery.checkGalleryPage( i )
			// Close the Gallery
			gallery.getGalleryCloseBtn().click()
		} )
	} )

	it( 'Check the Gallery Pages Movement', () => {
		// Open the Preview
		preview.getPreviewSpan().first().click()
		// Check for the Continue Reading exist
		preview.getFooterContinueReading().then( res => {
			if ( res.css( 'display' ) !== 'none' ) {
				preview.getFooterContinueReading().click()
			}
		} )
		const i = 0
		// Check if the Image exist
		preview.getBodyGalleryImages().its( 'length' ).then( () => {
			// Open the Gallery
			preview.getBodyGalleryImages().first().click()
			// Check the Current Gallery Page
			gallery.checkGalleryPage( i )
			// Click on the Next Icon
			gallery.getGalleryNextBtn().click()
			// Check the Next Gallery Page
			gallery.checkGalleryPage( i + 1 )
			// Click on the Previous Icon
			gallery.getGalleryPrevBtn().click()
			// Check the Previous Gallery Page
			gallery.checkGalleryPage( i )
			// Close the Gallery
			gallery.getGalleryCloseBtn().click()
		} )

	} )

} )
