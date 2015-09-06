module.exports = {

  range (start = 0, stop = null, step = 1) {
    let [_start, _stop] = (stop !== null) ? [start, stop] : [0, start];
    let length = Math.max(Math.ceil((_stop - _start) / step), 0);
    let range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  },

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
    for (let key in eventMap) {
      document.addEventListener(key, eventMap[key], false);
    }
  },

  removeEventsFromDocument (eventMap) {
    for (let key in eventMap) {
      document.removeEventListener(key, eventMap[key], false);
    }
  },

  angleFromPositions (cx, cy, ex, ey) {
    let theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
    return theta * 180 / Math.PI;
  },

  angle360FromPositions (cx, cy, ex, ey) {
    let angle = this.angleFromPositions(cx, cy, ex, ey);
    return angle < 0 ? 360 + angle : angle;
  }
};
