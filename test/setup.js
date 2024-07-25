import { vi } from 'vitest'
/* global window */
Object.defineProperty( window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation( () => ( {
		matches: true
	} ) )
} )
