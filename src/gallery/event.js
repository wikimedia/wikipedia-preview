let eventListenerStack = []

const addEventListener = ( target, type, listener, options = undefined ) => {
	target.addEventListener( type, listener, options )
	eventListenerStack.push( [ target, type, listener, options ] )
}

const clearAllEventListener = () => {
	eventListenerStack.forEach( eventListener => {
		const [ target, type, listener, options ] = eventListener
		target.removeEventListener( type, listener, options )
	} )
	eventListenerStack = []
}

export { addEventListener, clearAllEventListener }
