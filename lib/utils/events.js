"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getMousePosition: function getMousePosition(event) {
    return {
      x: event.pageX,
      y: event.pageY
    };
  },
  getTouchPosition: function getTouchPosition(event) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  },
  pauseEvent: function pauseEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    event.returnValue = false;
    event.cancelBubble = true;
  },
  addEventsToDocument: function addEventsToDocument(eventMap) {
    for (var key in eventMap) {
      document.addEventListener(key, eventMap[key], false);
    }
  },
  removeEventsFromDocument: function removeEventsFromDocument(eventMap) {
    for (var key in eventMap) {
      document.removeEventListener(key, eventMap[key], false);
    }
  },
  targetIsDescendant: function targetIsDescendant(event, parent) {
    var node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  }
};