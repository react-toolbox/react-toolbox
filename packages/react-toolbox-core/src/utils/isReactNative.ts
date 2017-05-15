export default function isReactNative(): boolean {
  return window.navigator && window.navigator.product === 'ReactNative';
}
