// import controller from './controller'
import { requestPagePreview } from './api'
import { renderPreview } from './preview'
import { getPopup } from './popup'
import {
	getWikipediaAttrFromUrl, buildWikipediaUrl, isTouch,
	version, getAnalyticsQueryParam, forEachRoot
} from './utils'

import { store, component } from 'reefjs'

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
	if ( prefersColorScheme === 'banana' ) {
		return
	}

	const wpStore = store( {
		content: null,
		target: null,
		position: null
	}, {
		trigger( state, target, position, title, titleLang ) {
			// wpStore.open = true
			state.target = target
			state.position = position
			state.content = null
			requestPagePreview( titleLang, title, ( data ) => {
				wpStore.receiveContent( titleLang, data )
			} )
		},

		receiveContent( state, titleLang, data ) {
			state.content = renderPreview( titleLang, data, isTouch )
		},

		close( state ) {
			state.target = null
		}
	} )

	const template = () => {
		console.log( 'template', wpStore.value ) // eslint-disable-line
		const state = wpStore.value
		const target = document.querySelector( '[data-wp-id="' + state.target + '"]' )
		return getPopup( target, state.position, state.content )
	}

	const container = document.createElement( 'div' )
	container.classList.add( 'wp-popup-container' )
	popupContainer.appendChild( container )

	component( container, template )

	// controller.init( popupContainer, prefersColorScheme, events )

	const onHoverOrTap = ( e ) => {
		e.preventDefault()
		const target = e.currentTarget
		console.log( 'on hover', target ) // eslint-disable-line
		wpStore.trigger(
			target.getAttribute( 'data-wp-id' ),
			{ x: e.clientX, y: e.clientY },
			target.getAttribute( 'data-wp-title' ) || target.textContent,
			target.getAttribute( 'data-wp-lang' ) || lang
		)
	}

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
		node.setAttribute( 'data-wp-id', crypto.randomUUID().replace( /-/g, '' ) )
		node.addEventListener( 'mouseenter', onHoverOrTap )
		node.addEventListener( 'mouseleave', () => {
			console.log( 'mouse leave' ) // eslint-disable-line
			wpStore.close()
		} )
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
