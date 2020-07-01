export const isTouch = () => {
  // TODO - add IE support
  return 'ontouchstart' in window
}
