import { Preview } from '../page-objects/preview-page'
import { goOffline, goOnline } from '../helpers/network'

const preview = new Preview()

describe( 'Check the layout', () => {

	beforeEach( 'Open the Test Page', () => {
		goOnline()
		cy.navigateToTestPage()
	} )

	it( 'Check the Wikipedia Preview in Standard with Image Layout', () => {
		preview.getPreviewSpan().eq( 0 ).click()

		preview.checkPreviewStandard()
	} )

	it.skip( 'Check the Wikipedia Preview in Offline Layout', () => {
		goOffline()

		preview.getPreviewSpan().eq( 0 ).click()

		preview.checkPreviewOffline()
	} )

	it.skip( 'Check the Wikipedia Preview in Error Layout', () => {
		preview.getPreviewSpan().eq( 1 ).click()

		preview.checkPreviewError()
	} )

	it.skip( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
		preview.getPreviewSpan().eq( 2 ).click()

		preview.checkPreviewDisambiguation()
	} )

} )
