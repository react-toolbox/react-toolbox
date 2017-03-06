import isReactNative from './isReactNative';

function getNativeTouchPosition(event) {
  return {
    x: event.touches[0].pageX,
    y: event.touches[0].pageY,
  };
}

function getWebTouchPosition(event) {
  return {
    x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
    y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
  };
}

export default function getTouchPosition(event) {
  return isReactNative()
    ? getNativeTouchPosition(event.nativeEvent)
    : getWebTouchPosition(event);
}
