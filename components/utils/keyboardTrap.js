export const handleMenuKeyboardTrap = (event, component) => {
  const focusableElements = getFocusableElements(component.menuNode);

  if (event.key === 'ArrowDown') { // on down arrow keyboard event
    focusNextElement(event, focusableElements);
  } else if (event.key === 'ArrowUp') { // on up arrow keyboard event
    focusPreviousElement(event, focusableElements);
  } else if (event.key === 'Tab' || event.key === 'Escape') {
    component.hide();
  }
};

// gets a list of tabbable elements and creates an array
function getFocusableElements(elementList) {
  return [...elementList.querySelectorAll('[tabindex]')];
}

function focusNextElement(event, focusableElements) {
  event.preventDefault();

  const firstItem = focusableElements[0];
  const lastItem = focusableElements[focusableElements.length - 1];
  const index = focusableElements.indexOf(event.target);

  if (event.target !== lastItem) {
    focusableElements[index + 1].focus();
  } else {
    firstItem.focus();
  }
}

function focusPreviousElement(event, focusableElements) {
  event.preventDefault();

  const firstItem = focusableElements[0];
  const lastItem = focusableElements[focusableElements.length - 1];
  const index = focusableElements.indexOf(event.target);

  if (event.target !== firstItem) {
    focusableElements[index - 1].focus();
  } else {
    lastItem.focus();
  }
}
