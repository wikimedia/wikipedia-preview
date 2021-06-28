import { Preview } from '../page-objects/preview'
import { msg } from '../../src/i18n'

const preview = new Preview()

export class Check {

	// Custom Command to check the existence of Preview
	preview() {

		preview.getPreview().should( 'be.visible' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getBody().should( 'be.visible' )

	}

	// Custom Command to check the existence of Mobile Preview
	mobilePreview() {
		preview.getMobPreview().should( 'be.visible' )
        .and( 'have.class', 'mobile' )
	}

	// Custom Command to check the Preview in Standard Mode
	previewStandard() {

		preview.getPreview().should( 'be.visible' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )
		preview.getHeaderImage().its( 'length' ).then( len => {
			if ( len > 0 ) {
				preview.getHeaderImage().should( 'be.visible' )
			}
		} )

		preview.getBody().should( 'be.visible' )
		preview.getBodyContent().should( 'be.visible' )
			.and( 'have.css', 'font-size' ).and( 'equal', '18px' )

		preview.getFooter().should( 'be.visible' )
		preview.getFooterContiReading().should( 'be.visible' )

	}

	// Custom Command to check the Preview in Expanded Mode
	previewExpanded() {

		preview.getPreview().should( 'be.visible' )
			.and( 'have.class', 'expanded' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getBody().should( 'be.visible' )
		preview.getBodyContent().should( 'be.visible' )
			.and( 'have.css', 'font-size' ).and( 'equal', '18px' )
		preview.getHeaderImage().its( 'length' ).then( len => {
			if ( len > 0 ) {
				preview.getBodyGallery().scrollIntoView().should( 'be.visible' )
				preview.getBodyGalleryImages().should( 'be.visible' )
			}
		} )
		preview.getFooter().should( 'be.visible' )
		preview.getFooterReadMore().should( 'be.visible' )

	}

	// Custom Command to check the Preview in Disambiguation Mode
	previewDisambiguation() {

		preview.getPreview().should( 'be.visible' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getPreview().then( tag => {

			const lang = tag.attr( 'lang' )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-disambiguation' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( ele => {
				cy.wrap( ele ).find( 'div.wikipediapreview-body-icon' )
			} )

			preview.getBodyAction().should( 'be.visible' )
				.and( 'contain', msg( lang, 'read-on-wiki' ) )
		} )

	}

	// Custom Command to check the Preview in Offline Mode
	previewOffline() {

		preview.getPreview().should( 'be.visible' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getPreview().then( tag => {

			const lang = tag.attr( 'lang' )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-offline' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( ele => {
				cy.wrap( ele ).find( 'div.wikipediapreview-body-icon' ).should( 'be.visible' )
				cy.wrap( ele ).find( 'span' ).should( 'contain', msg( lang, 'preview-offline-message' ) )

			} )

			preview.getBodyAction().should( 'be.visible' )
				.and( 'contain', msg( lang, 'preview-offline-cta' ) )

		} )

	}

	// Custom Command to check the Preview in Error Mode
	previewError() {

		preview.getPreview().should( 'be.visible' )

		preview.getHeader().should( 'be.visible' )
		preview.getHeaderWatermark().should( 'be.visible' )
		preview.getHeaderClosebtn().should( 'be.visible' )

		preview.getPreview().then( tag => {

			const lang = tag.attr( 'lang' )

			preview.getBody().should( 'be.visible' )
				.and( 'have.class', 'wikipediapreview-body-error' )
				.and( 'have.css', 'font-size' ).and( 'equal', '16px' )

			preview.getBodyMessage().then( ele => {
				cy.wrap( ele ).find( 'div.wikipediapreview-body-icon' )
				cy.wrap( ele ).find( 'span' ).should( 'contain', msg( lang, 'preview-error-message' ) )

			} )

			preview.getBodyAction().should( 'be.visible' )
				.should( 'contain', msg( lang, 'read-on-wiki' ) )

		} )

	}

}
