import values from 'ramda/src/values';

export function addOnTransitionEnded(element, fn) {
  const eventName = transitionEventNamesFor(element);
  if (!eventName) return false;
  element.addEventListener(eventName, fn);
  return true;
}

export function removeOnTransitionEnded(element, fn) {
  const eventName = transitionEventNamesFor(element);
  if (!eventName) return false;
  element.removeEventListener(eventName, fn);
  return true;
}

const TRANSITIONS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
};

function transitionEventNamesFor(element) {
  return values(TRANSITIONS).reduce(
    (result, transition) =>
      !result && (element && element.style[transition] !== undefined)
        ? TRANSITIONS[transition]
        : result
  );
}
