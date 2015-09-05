module.exports = {

  range (start, stop, step = 1) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }

    let length = Math.max(Math.ceil((stop - start) / step), 0);
    let range = Array(length);

    for (const idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

};
