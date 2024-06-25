export class Gallery {

	getGalleryImageBody( i ) {
		return cy.get( 'div.wp-gallery-fullscreen-slider-item' ).eq( i )
	}

	getGalleryImage( i ) {
		return cy.get( 'div.wp-gallery-fullscreen-slider-item' ).eq( i ).find( 'img' )
	}

	getGalleryCaption( i ) {
		return this.getGalleryImageBody( i ).find( 'div.wp-gallery-fullscreen-slider-item-caption' )
	}

	getGalleryCaptionText( i ) {
		return this.getGalleryImageBody( i ).find( 'div.wp-gallery-fullscreen-slider-item-caption-text' )
	}

	getGalleryCloseBtn() {
		return cy.get( 'div.wp-gallery-fullscreen-close' )
	}

	getGalleryNextBtn() {
		return cy.get( 'div.wp-gallery-fullscreen-slider-button.next' )
	}

	getGalleryPrevBtn() {
		return cy.get( 'div.wp-gallery-fullscreen-slider-button.previous' )
	}

	// Custom Command to check the existence of Preview
	checkGalleryPage( i ) {
		this.getGalleryCaptionText( i ).should( 'be.visible' )
		if ( i === 0 ) {
			this.getGalleryNextBtn().should( 'be.visible' )
			this.getGalleryPrevBtn().should( 'be.not.visible' )
		} else if ( i === cy.get( 'div.wp-gallery-fullscreen-slider-item' ).length - 1 ) {
			this.getGalleryNextBtn().should( 'be.not.visible' )
			this.getGalleryPrevBtn().should( 'be.visible' )
		} else {
			this.getGalleryNextBtn().should( 'be.visible' )
			this.getGalleryPrevBtn().should( 'be.visible' )
		}
		this.getGalleryCloseBtn().should( 'be.visible' )
	}

	checkMobileGalleryPage( i ) {
		this.getGalleryCaption( i ).should( 'be.visible' )
		this.getGalleryNextBtn().should( 'be.not.visible' )
		this.getGalleryPrevBtn().should( 'be.not.visible' )
		this.getGalleryCloseBtn().should( 'be.visible' )
	}
}
