export const handleMenuKeyboardTrap = (element, component) => {
  const focusableElements = getFocusableElements(component.menuNode);

  if (event.key === 'ArrowDown') { // on down arrow keyboard event
    focusNextElement(element, focusableElements);
  } else if (event.key === 'ArrowUp') { // on up arrow keyboard event
    focusPreviousElement(element, focusableElements, false);
  } else if (event.key === 'Tab') {
    component.hide();
  }
};

// gets a list of tabbable elements and creates an array
function getFocusableElements(elementList) {
  return [...elementList.querySelectorAll('[tabindex]')];
}

function focusNextElement(currentElement, focusableElements) {
  event.preventDefault();

  const firstItem = focusableElements[0];
  const lastItem = focusableElements[focusableElements.length - 1];
  const index = focusableElements.indexOf(currentElement);

  if (currentElement !== lastItem) {
    focusableElements[index + 1].focus();
  } else {
    firstItem.focus();
  }
}

function focusPreviousElement(currentElement, focusableElements) {
  event.preventDefault();

  const firstItem = focusableElements[0];
  const lastItem = focusableElements[focusableElements.length - 1];
  const index = focusableElements.indexOf(currentElement);

  if (currentElement !== firstItem) {
    focusableElements[index - 1].focus();
  } else {
    lastItem.focus();
  }
}
