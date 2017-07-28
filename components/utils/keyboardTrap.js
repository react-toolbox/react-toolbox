export const nextElementKeyboardTrap = (element, firstItem, lastItem) => {
  event.preventDefault();

  if (element !== lastItem) {
    element.nextSibling.focus();
  } else {
    firstItem.focus();
  }
};

export const previousElementKeyboardTrap = (element, firstItem, lastItem) => {
  event.preventDefault();

  if (element !== firstItem) {
    element.previousSibling.focus();
  } else {
    lastItem.focus();
  }
};
