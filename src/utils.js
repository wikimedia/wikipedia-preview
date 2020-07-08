export const isTouch = 'ontouchstart' in window || ( navigator.maxTouchPoints > 0 ) ||
( navigator.msMaxTouchPoints > 0 )
