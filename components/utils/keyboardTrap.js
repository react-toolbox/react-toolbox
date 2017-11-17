export const handleMenuKeyboardTrap = (event, component) => {
  event.preventDefault();
  const focusableElements = getFocusableElements(component.menuNode);

  if (event.keyCode === 40) { // on down arrow keyboard event
    focusNextElement(event, focusableElements);
  } else if (event.keyCode === 38) { // on up arrow keyboard event
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
  const firstItem = focusableElements[0];
  const lastItem = focusableElements[focusableElements.length - 1];
  const index = focusableElements.indexOf(event.target);

  if (event.target !== firstItem) {
    focusableElements[index - 1].focus();
  } else {
    lastItem.focus();
  }
}
