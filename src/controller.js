import { requestPagePreview } from './api'
import { customEvents } from './event'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview, renderLoading, renderError, renderDisambiguation, renderOffline } from './preview'
import { isTouch, getDir, isOnline, invokeCallback } from './utils'

const Status = {
	UNKNOWN: 'unknown',
	READY: 'ready',
	LOADING: 'loading',
	SHOWN_OK: 'shown_ok',
	SHOWN_ERROR: 'shown_error'
}

const state = {
	colorScheme: null,
	events: {},
	lang: null,
	title: null,
	target: null,
	pointer: { x: 0, y: 0 },
	status: Status.UNKNOWN,
	requestId: null
}

let popup

const controller = {
	init: ( popupContainer, prefersColorScheme, events ) => {
		popup = isTouch ?
			createTouchPopup( popupContainer ) :
			createPopup( popupContainer )
		popup.subscribe( customEvents( popup ) )
		state.colorScheme = prefersColorScheme
		state.events = events
		state.status = Status.READY
	},
	trigger: ( title, lang, pointer, target ) => {
		// GUARD CLAUSES

		// Not initiliazed yet
		if ( state.status === Status.UNKNOWN ) {
			return
		}

		// New trigger on the same target, and not a refresh
		if (
			state.target === target &&
			state.status !== Status.SHOWN_ERROR
		) {
			return
		}

		// All good, moving on

		// Hide the old popup
		if ( popup.element.style.visibility === 'visible' ) {
			popup.hide()
		}

		// Generate a new unique request ID to ensure
		// callbacks from older requests are ignored
		const requestId = state.requestId = Date.now()

		state.title = title
		state.lang = lang
		state.target = target
		state.status = Status.LOADING

		popup.dir = getDir( lang )
		popup.show(
			renderLoading(
				isTouch,
				lang,
				popup.dir,
				status.colorScheme
			),
			target,
			pointer
		)

		requestPagePreview( lang, title, ( data ) => {
			// Compare request id in state and closure
			// to ensure this callback is not outdated
			if ( requestId !== state.requestId ) {
				return
			}
			if ( state.status === Status.LOADING ) {
				popup.loading = false
				if ( data ) {
					popup.lang = lang
					popup.title = title
					if ( data.type === 'standard' ) {
						popup.show(
							renderPreview(
								lang,
								data,
								isTouch,
								state.colorScheme
							),
							target,
							pointer
						)
						invokeCallback( state.events, 'onShow', [ title, lang, 'standard' ] )
					} else if ( data.type === 'disambiguation' ) {
						const content = data.extractHtml ?
							renderPreview(
								lang,
								data,
								isTouch,
								state.colorScheme
							) :
							// fallback message when no extract is found on disambiguation page
							renderDisambiguation(
								isTouch,
								lang,
								data.title,
								data.dir,
								state.colorScheme
							)
						popup.show(
							content,
							target,
							pointer
						)
						invokeCallback( state.events, 'onShow', [ title, lang, 'disambiguation' ] )
					}
				} else {
					if ( isOnline() ) {
						popup.show(
							renderError(
								isTouch,
								lang,
								title,
								popup.dir,
								state.colorScheme
							),
							target,
							pointer
						)
						invokeCallback( state.events, 'onShow', [ title, lang, 'error' ] )
					} else {
						popup.show(
							renderOffline(
								isTouch,
								lang,
								popup.dir,
								state.colorScheme
							),
							target,
							pointer
						)
						invokeCallback( state.events, 'onShow', [ title, lang, 'offline' ] )
						const refreshBtn = popup.element.querySelector( '.wikipediapreview-body-action' )
						refreshBtn.addEventListener( 'click', () => {
							controller.trigger( title, lang, pointer, target )
						} )
					}
				}
				const readOnWikiCta = popup.element.querySelector( '.wikipediapreview-footer-cta-readonwiki, .wikipediapreview-cta-readonwiki' )
				if ( readOnWikiCta ) {
					readOnWikiCta.addEventListener( 'click', () => {
						invokeCallback( state.events, 'onWikiRead', [ title, lang ] )
					} )
				}
			}
		} )
	},
	close: () => {
		if ( popup ) {
			popup.hide()
		}
	}
}

export default controller
