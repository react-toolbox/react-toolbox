export const handleMenuKeyboardTrap = (element, component) => {
  const focusableElements = getFocusableElements(component.menuNode);

  if (event.key === 'ArrowDown') { // on down arrow keyboard event
    getNextElement(element, focusableElements);
  } else if (event.key === 'ArrowUp') { // on up arrow keyboard event
    getNextElement(element, focusableElements, false);
  } else if (event.key === 'Tab') {
    component.hide();
  }
};

// gets a list of tabbable elements and creates an array
function getFocusableElements(elementList) {
  return [...elementList.querySelectorAll('[tabindex]')];
}

// By default, #getNextElement gets the next element in a downward direction.
// It assigns the start as the first element and gets the next element by adding 1 to that index.
// If false is passed in, it gets the next element in an upwards direction.
// It assigns the start as the last element and gets next element by substracting 1 to that index
function getNextElement(element, focusableElements, down = true) {
  event.preventDefault();

  const index = focusableElements.indexOf(element);
  const nextIndex = down ? index + 1 : index - 1;
  const start = down ? focusableElements[0] : focusableElements[focusableElements.length - 1];
  const end = down ? focusableElements[focusableElements.length - 1] : focusableElements[0];

  if (element !== end) {
    focusableElements[nextIndex].focus();
  } else {
    start.focus();
  }
}
