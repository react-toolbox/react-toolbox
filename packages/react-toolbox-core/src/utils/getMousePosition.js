export default function getMousePosition(event) {
  return {
    x: event.pageX - (window.scrollX || window.pageXOffset),
    y: event.pageY - (window.scrollY || window.pageYOffset),
  };
}
