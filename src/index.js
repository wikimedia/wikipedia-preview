import { requestPagePreview } from './api'
import { renderPreview } from './components/preview'
import app from './components/app'
import {
	getWikipediaAttrFromUrl, buildWikipediaUrl, isTouch,
	version, getAnalyticsQueryParam, forEachRoot
} from './utils'

import { component } from 'reefjs'

import store from './store'

// getPreviewHtml is meant to be used by the Wordpress plugin only
const getPreviewHtml = ( title, lang, callback ) => {
	requestPagePreview( lang, title, ( data ) => {
		callback( renderPreview( lang, data, isTouch ) )
	} )
}

function init( {
	root = document,
	selector = '[data-wikipedia-preview]',
	lang = 'en',
	detectLinks = false,
	popupContainer = document.body,
	events = {},
	debug = false,
	prefersColorScheme = 'detect'
} ) {
	const foundSelectorLinks = []
	const foundDetectLinks = []

	if ( events === 1 ) {
		return
	}
	store.setColorScheme( prefersColorScheme )

	let container = document.querySelector( '.wp-popup-containerner' )
	if ( !container ) {
		container = document.createElement( 'div' )
		container.classList.add( 'wp-popup-container' )
		popupContainer.appendChild( container )
		// todo: consider putting the 'dark' class
		// at this level
	}

	component(
		container,
		() => app( store.value ),
		{
			events: {
				close: store.close,
				expand: store.expand,
				clickThumbnail: store.clickThumbnail,
				closeGallery: store.closeGallery,
				previousGalleryImage: store.previousGalleryImage,
				nextGalleryImage: store.nextGalleryImage
			}
		}
	)

	forEachRoot( root, selector, ( node ) => {
		foundSelectorLinks.push( {
			node,
			text: node.textContent,
			title: node.getAttribute( 'data-wp-title' ) || node.textContent,
			lang: node.getAttribute( 'data-wp-lang' ) || lang
		} )
	} )

	if ( detectLinks ) {
		forEachRoot( root, 'a', ( node ) => {
			const matches = getWikipediaAttrFromUrl( node.getAttribute( 'href' ) )
			if ( matches ) {
				node.setAttribute( 'data-wp-title', matches.title )
				node.setAttribute( 'data-wp-lang', matches.lang )

				foundDetectLinks.push( {
					node,
					text: node.textContent,
					title: matches.title,
					lang: matches.lang
				} )

				// set wprov on href to track engagement on links with preview
				const param = getAnalyticsQueryParam().split( '=' )
				const url = new URL( node.href )
				url.searchParams.set( param[ 0 ], param[ 1 ] )
				node.href = url.href
			}
		} )
	}

	// const eventName = isTouch ? 'click' : 'mouseenter'
	foundSelectorLinks.concat( foundDetectLinks ).forEach( ( { node } ) => {
		if ( !node.getAttribute( 'id' ) ) {
			node.setAttribute( 'id', 'wp-' + crypto.randomUUID().replace( /-/g, '' ) )
		}

		if ( isTouch ) {
			node.addEventListener( 'click', ( e ) => {
				e.preventDefault()
				const target = e.currentTarget
				store.trigger(
					target.getAttribute( 'id' ),
					{ x: e.clientX, y: e.clientY },
					target.getAttribute( 'data-wp-title' ) || target.textContent,
					target.getAttribute( 'data-wp-lang' ) || lang
				)
			} )
		} else {
			let momentaryLapseTimeout
			node.addEventListener( 'mouseenter', ( e ) => {
				if ( momentaryLapseTimeout ) {
					clearTimeout( momentaryLapseTimeout )
					momentaryLapseTimeout = null
					return
				}
				const target = e.currentTarget
				store.trigger(
					target.getAttribute( 'id' ),
					{ x: e.clientX, y: e.clientY },
					target.getAttribute( 'data-wp-title' ) || target.textContent,
					target.getAttribute( 'data-wp-lang' ) || lang
				)
			} )
			node.addEventListener( 'mouseleave', ( e ) => {
				const toElement = e.toElement || e.relatedTarget || e.target
				const currentTarget = document.getElementById( store.value.targetId )
				const popup = document.querySelector( '.wp-popup' )
				if ( toElement !== currentTarget && popup && !popup.contains( toElement ) ) {
					momentaryLapseTimeout = setTimeout( () => {
						store.close( e )
						momentaryLapseTimeout = null
					}, 300 )
				}
			} )
		}
	} )

	if ( debug ) {
		/* eslint-disable no-console */
		console.group( 'Wikipedia Preview [debug mode]' )
		console.group( `Searching for "${ selector }" inside ${ root }, Total links found: ${ foundSelectorLinks.length }` )
		foundSelectorLinks.forEach( ( link, index ) => {
			console.log( index + 1, `${ link.text } -> ${ buildWikipediaUrl( link.lang, link.title, isTouch, false ) }` )
		} )
		console.groupEnd()
		if ( detectLinks ) {
			console.group( `Searching for links to Wikipedia, Total links found: ${ foundDetectLinks.length }` )
			foundDetectLinks.forEach( ( link, index ) => {
				console.log( index + 1, `${ link.text } -> ${ buildWikipediaUrl( link.lang, link.title, isTouch, false ) }` )
			} )
			console.groupEnd()
		}
		console.groupEnd()
		/* eslint-enable no-console */
	}

}

version()

export default { init, version, getPreviewHtml }
