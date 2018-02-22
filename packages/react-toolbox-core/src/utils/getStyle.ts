export default function getStyle(element, property) {
  return window.getComputedStyle
    ? window.getComputedStyle(element, undefined).getPropertyValue(property)
    : element.currentStyle[property];
}
