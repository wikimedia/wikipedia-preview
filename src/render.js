export default ( component, container = document.body ) => {
	const { template, ui = {}, events = {} } = component

	container.insertAdjacentHTML( 'beforeend', template )

	Object.entries( events ).forEach( entry => { // eslint-disable-line
		const [ key, action ] = entry,
			[ uiElement, eventType ] = key.split( ' ' ),
			targetElements = container.querySelectorAll( ui[ uiElement ] )

		Array.prototype.forEach.call( targetElements, targetElement => {
			targetElement.addEventListener( eventType, action )
		} )

	} )
}
