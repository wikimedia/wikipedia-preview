import '../style/preview.less'

const renderLoading = ( isTouch ) => {
	return `
    <div class="wikipediapreview ${isTouch ? 'mobile' : ''}">
        <div class="wikipediapreview-header">
          <div class="wikipediapreview-loading-header-image"></div>
          <div class="wikipediapreview-header-wordmark"></div>
          <div class="wikipediapreview-header-closebtn"></div>
        </div>
        <div class="wikipediapreview-loading">
          <div class="wikipediapreview-loading-body">
            <div class="wikipediapreview-loading-body-line larger"></div>
            <div class="wikipediapreview-loading-body-line medium"></div>
            <div class="wikipediapreview-loading-body-line larger"></div>
            <div class="wikipediapreview-loading-body-line medium"></div>
            <div class="wikipediapreview-loading-body-line smaller"></div>
            <div class="wikipediapreview-loading-body-line larger"></div>
            <div class="wikipediapreview-loading-body-line medium"></div>
            <div class="wikipediapreview-loading-body-line larger"></div>
            <div class="wikipediapreview-loading-body-line medium"></div>
            <div class="wikipediapreview-loading-body-line smaller"></div>
          </div>
        </div>
        <div class="wikipediapreview-loading-footer"></div>
    </div>
  `.trim()
}

export { renderLoading }
