module.exports = {

  angleFromPositions (cx, cy, ex, ey) {
    const theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
    return theta * 180 / Math.PI;
  },

  angle360FromPositions (cx, cy, ex, ey) {
    const angle = this.angleFromPositions(cx, cy, ex, ey);
    return angle < 0 ? 360 + angle : angle;
  },

  range (start = 0, stop = null, step = 1) {
    let [_start, _stop] = [0, start];
    if (stop !== null) {
      [_start, _stop] = [start, stop];
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0);
    const range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  },

  round (number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
      const decimalPower = Math.pow(10, decimals);
      return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }
    return NaN;
  },

  getViewport () {
    return {
      height: window.innerHeight || document.documentElement.offsetHeight,
      width: window.innerWidth || document.documentElement.offsetWidth
    };
  },

  events: require('./events'),
  prefixer: require('./prefixer'),
  time: require('./time'),
  testing: require('./testing')
};
