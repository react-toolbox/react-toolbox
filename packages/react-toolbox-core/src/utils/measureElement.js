import isReactNative from './isReactNative';

export default function measureElement(element) {
  return new Promise((resolve) => {
    if (isReactNative()) {
      element.measure((x, y, width, height, pageX, pageY) => {
        resolve({ left: pageX, top: pageY, width, height });
      });
    } else {
      const { left, top, width, height } = element.getBoundingClientRect();
      resolve({ left, top, width, height });
    }
  });
}
