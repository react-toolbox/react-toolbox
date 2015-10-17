module.exports = {

  angleFromPositions (cx, cy, ex, ey) {
    let theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
    return theta * 180 / Math.PI;
  },

  angle360FromPositions (cx, cy, ex, ey) {
    let angle = this.angleFromPositions(cx, cy, ex, ey);
    return angle < 0 ? 360 + angle : angle;
  },

  range (start = 0, stop = null, step = 1) {
    let [_start, _stop] = (stop !== null) ? [start, stop] : [0, start];
    let length = Math.max(Math.ceil((_stop - _start) / step), 0);
    let range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  },

  round (number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
      let decimalPower = Math.pow(10, decimals);
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
