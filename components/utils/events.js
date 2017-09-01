import keys from 'ramda/src/keys';

export default {
  getMousePosition(event) {
    return {
      x: event.pageX - (window.scrollX || window.pageXOffset),
      y: event.pageY - (window.scrollY || window.pageYOffset),
    };
  },

  getTouchPosition(event) {
    return {
      x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
      y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
    };
  },

  pauseEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  },

  addEventsToDocument(eventMap) {
    Object.keys(eventMap).forEach((key) => {
      document.addEventListener(key, eventMap[key], false);
    });
  },

  removeEventsFromDocument(eventMap) {
    Object.keys(eventMap).forEach((key) => {
      document.removeEventListener(key, eventMap[key], false);
    });
  },

  targetIsDescendant(event, parent) {
    let node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  },

  addEventListenerOnTransitionEnded(element, fn) {
    const eventName = transitionEventNamesFor(element);
    if (!eventName) return false;
    element.addEventListener(eventName, fn);
    return true;
  },

  removeEventListenerOnTransitionEnded(element, fn) {
    const eventName = transitionEventNamesFor(element);
    if (!eventName) return false;
    element.removeEventListener(eventName, fn);
    return true;
  },
};

const TRANSITIONS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
};

function transitionEventNamesFor(element) {
  return keys(TRANSITIONS).reduce((result, transition) => (
    !result && (element && element.style[transition] !== undefined)
      ? TRANSITIONS[transition]
      : result
  ), null);
}
