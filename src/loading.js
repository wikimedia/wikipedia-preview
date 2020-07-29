import '../style/preview.less'

const renderLoading = ( isTouch ) => {
	console.log( 'loading.js - renderLoading' )

	return `
    <div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
        <div class="wikipediapreview-header">
          <div class="wikipediapreview-header-image"></div>
          <div class="wikipediapreview-header-wordmark"></div>
          <div class="wikipediapreview-header-closebtn"></div>
        </div>
        <div class="wikipediapreview-loading">
          <div class="wikipediapreview-loading-body"></div>
        </div>
    </div>
  `.trim()
}

export { renderLoading }
