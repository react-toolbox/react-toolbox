export default {
  getMousePosition (event) {
    return {
      x: event.pageX,
      y: event.pageY
    };
  },

  getTouchPosition (event) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  },

  pauseEvent (event) {
    event.stopPropagation();
    event.preventDefault();
    event.returnValue = false;
    event.cancelBubble = true;
  },

  addEventsToDocument (eventMap) {
    for (const key in eventMap) {
      document.addEventListener(key, eventMap[key], false);
    }
  },

  removeEventsFromDocument (eventMap) {
    for (const key in eventMap) {
      document.removeEventListener(key, eventMap[key], false);
    }
  },

  targetIsDescendant (event, parent) {
    let node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  }
};
