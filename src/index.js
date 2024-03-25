import controller from './controller'
import { requestPagePreview } from './api'
import { renderPreview } from './preview'
import {
	getWikipediaAttrFromUrl, buildWikipediaUrl, isTouch,
	version, getAnalyticsQueryParam, forEachRoot
} from './utils'

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

	controller.init( popupContainer, prefersColorScheme, events )

	const onHoverOrTap = ( e ) => {
		e.preventDefault()
		const target = e.currentTarget
		controller.trigger(
			target.getAttribute( 'data-wp-title' ) || target.textContent,
			target.getAttribute( 'data-wp-lang' ) || lang,
			{ x: e.clientX, y: e.clientY },
			target
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

	const eventName = isTouch ? 'click' : 'mouseenter'
	foundSelectorLinks.concat( foundDetectLinks ).forEach( ( target ) => {
		target.node.addEventListener( eventName, onHoverOrTap )
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
