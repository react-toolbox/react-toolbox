import { TouchEvent as ReactTouchEvent } from 'react';
import { Coordinates } from './types';
import isReactNative from './isReactNative';

function getNativeTouchPosition(event: TouchEvent): Coordinates {
  const firstTouch = event.touches[0];
  return firstTouch
    ? { x: firstTouch.pageX, y: firstTouch.pageY }
    : { x: 0, y: 0 };
}

function getWebTouchPosition(event: ReactTouchEvent<any>): Coordinates {
  return {
    x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
    y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
  };
}

export default function getTouchPosition(event: ReactTouchEvent<any>): Coordinates {
  return isReactNative()
    ? getNativeTouchPosition(event.nativeEvent)
    : getWebTouchPosition(event);
}
