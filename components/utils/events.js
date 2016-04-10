export default {
  getMousePosition (event) {
    return {
      x: event.pageX - window.scrollX,
      y: event.pageY - window.scrollY
    };
  },

  getTouchPosition (event) {
    return {
      x: event.touches[0].pageX - window.scrollX,
      y: event.touches[0].pageY - window.scrollY
    };
  },

  pauseEvent (event) {
    event.stopPropagation();
    event.preventDefault();
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
