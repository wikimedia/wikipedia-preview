import { Preview } from '../page-objects/preview-page'

const preview = new Preview()

describe( 'Check the Hover and Click Event', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToEnglishPage()
	} )

	it( 'Check the Preview by hovering over the Span and then leaving', () => {

		preview.getPreviewSpan().first().trigger( 'pointerenter', {
			position: 'right',
			pointerType: 'mouse'
		} )

		preview.checkPreview()

		preview.getPreviewSpan().first().trigger( 'mouseleave', 'right' )
	} )

	it( 'Check the Preview by Clicking over the Span and click Close', () => {

		preview.getPreviewSpan().first().click()
		preview.checkPreview()

		preview.getPreviewSpan().first().trigger( 'mouseleave', 'right' )
	} )

} )
