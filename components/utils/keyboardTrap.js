export default {
  nextElementKeyboardTrap(element, focusableElements) {
    event.preventDefault();

    const firstItem = focusableElements[0];
    const lastItem = focusableElements[focusableElements.length - 1];
    const index = focusableElements.indexOf(element);

    if (element !== lastItem) {
      focusableElements[index + 1].focus();
    } else {
      firstItem.focus();
    }
  },

  previousElementKeyboardTrap(element, focusableElements) {
    event.preventDefault();

    const firstItem = focusableElements[0];
    const lastItem = focusableElements[focusableElements.length - 1];
    const index = focusableElements.indexOf(element);

    if (element !== firstItem) {
      focusableElements[index - 1].focus();
    } else {
      lastItem.focus();
    }
  },

  getFocusableElements(elementList) {
    return [...elementList.querySelectorAll('[tabindex]')];
  },
};
