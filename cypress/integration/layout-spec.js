import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'
import { goOffline, goOnline, changeOnline } from '../plugins/network'

const preview = new Preview()

describe( 'Check the layout', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it( 'Check the span should have the classname data-wikipedia-preview', () => {
		preview.getPreviewSpan().should( 'have.attr', 'data-wikipedia-preview' )
	} )

	it( 'Check the Wikipedia Preview in Offline Layout', () => {
		goOffline()

		preview.getPreviewSpan().first().click()

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getPreview().then( tag => {
			const lang = tag.attr( 'lang' )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-offline' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( tag => {
				cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
				cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-offline-message' ) )

			} )

			preview.BodyAction().should( 'be.visible' )
				.and( 'contain', msg( lang, 'preview-offline-cta' ) )

		} )

		goOnline()

	} )

	it( 'Check the Wikipedia Preview in Error Layout', () => {
		preview.getPreviewSpan().eq( 1 ).click()

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getPreview().then( tag => {

			const lang = tag.attr( 'lang' )

			cy.log( lang )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-error' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( tag => {
				cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
				cy.wrap( tag ).find( 'span' ).should( 'contain', msg( lang, 'preview-error-message' ) )

			} )

			preview.getBodyAction().should( 'be.visible' )
				.and( 'contain', msg( lang, 'read-on-wiki' ) )

		} )

	} )

	it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
		preview.getPreviewSpan().eq( 2 ).click()

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.vPreview().then( tag => {

			const lang = tag.attr( 'lang' )

			cy.log( lang )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-disambiguation' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( tag => {
				cy.wrap( tag ).find( 'div.wikipediapreview-body-icon' )
			} )

			preview.getBodyAction().should( 'be.visible' )
				.and( 'contain', msg( lang, 'read-on-wiki' ) )

		} )

	} )

} )
