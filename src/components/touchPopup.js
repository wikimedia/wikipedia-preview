import '../../style/popup.less'

const originalOverflow = document.body.style.overflow

const touchPopup = ( { target, content } ) => {
	document.body.style.overflow = target ? 'hidden' : originalOverflow
	const style = target ? '' : 'visibility: hidden;'
	return `
		<div class="wp-dark-screen" style="${ style }" onclick="close">
		</div>
		<div class="wp-touch-popup" style="${ style }">
			${ content }
		</div>
	`
}

export { touchPopup }
