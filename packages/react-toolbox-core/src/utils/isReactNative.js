export default function isReactNative() {
  return window.navigator && window.navigator.product === 'ReactNative';
}
