module.exports = {

  range (start = 0, stop = null, step = 1) {
    let [_start, _stop] = (stop !== null) ? [start, stop] : [0, start];
    let length = Math.max(Math.ceil((_stop - _start) / step), 0);
    let range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  }

};
