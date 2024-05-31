import '../../style/popup.less'

import { classesToString } from '../utils'

const popup = ( { content, expanded } ) => {
	const classes = {
		'wp-popup': true,
		expanded: expanded
	}
	return `
		<div class="${ classesToString( classes ) }" onmouseleave="close">
			${ content }
			<div class="wp-popup-arrow"></div>
		</div>
	`
}

export { popup }
