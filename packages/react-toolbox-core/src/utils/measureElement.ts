import { NativeComponent } from 'react-native';
import isReactNative from './isReactNative';

export type PositionDescriptor = {
  left: number,
  top: number,
  width: number,
  height: number,
};

export default function measureElement(
  element: HTMLElement | NativeComponent,
): Promise<PositionDescriptor> {
  return new Promise<PositionDescriptor>(resolve => {
    if (isReactNative()) {
      (element as NativeComponent).measure((x, y, width, height, pageX, pageY) => {
        resolve({ left: pageX, top: pageY, width, height });
      });
    } else {
      const { left, top, width, height } = (element as HTMLElement).getBoundingClientRect();
      resolve({ left, top, width, height });
    }
  });
}
