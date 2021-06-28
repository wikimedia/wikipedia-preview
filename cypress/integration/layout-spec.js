import { Preview } from '../page-objects/preview'
import { Check } from '../page-objects/check'
import { goOffline, goOnline } from '../page-objects/network'

const preview = new Preview()
const check = new Check()

describe( 'Check the layout', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it.only( 'Check the Wikipedia Preview in Standard with Image Layout', () => {
		preview.getPreviewSpan().eq( 0 ).click()
		cy.wait(1000)
		check.previewStandard()

		preview.getHeaderClosebtn().click()
	} )

	it.skip( 'Check the Wikipedia Preview in Offline Layout', () => {
		goOffline()

		preview.getPreviewSpan().eq( 0 ).click()

		check.previewOffline()

		preview.getHeaderClosebtn().click()

		goOnline()
	} )

	it( 'Check the Wikipedia Preview in Error Layout', () => {
		preview.getPreviewSpan().eq( 1 ).click()

		check.previewError()

		preview.getHeaderClosebtn().click()
	} )

	it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
		preview.getPreviewSpan().eq( 2 ).click()

		check.previewDisambiguation()

		preview.getHeaderClosebtn().click()
	} )

} )
