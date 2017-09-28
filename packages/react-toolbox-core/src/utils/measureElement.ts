import isReactNative from './isReactNative';

export type PositionDescriptor = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function measureElement(
  element: HTMLElement | any,
): Promise<PositionDescriptor> {
  return new Promise<PositionDescriptor>(resolve => {
    if (isReactNative()) {
      (element as any).measure(
        (x, y, width, height, pageX, pageY) => {
          resolve({ left: pageX, top: pageY, width, height });
        },
      );
    } else {
      const {
        left,
        top,
        width,
        height,
      } = (element as HTMLElement).getBoundingClientRect();
      resolve({ left, top, width, height });
    }
  });
}
