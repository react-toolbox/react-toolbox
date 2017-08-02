/* global describe */
/* global it */
import expect from 'expect';
import time from '../time';

describe('time', function () {
  describe('toggleTimeMode', function () {
    it('changes from am to pm', function () {
      const date = new Date(107, 2, 2, 10, 30);
      expect(time.toggleTimeMode(date).getTime()).toEqual(new Date(107, 2, 2, 22, 30).getTime());
    });
    it('changes from pm to am', function () {
      const date = new Date(107, 2, 2, 22, 30);
      expect(time.toggleTimeMode(date).getTime()).toEqual(new Date(107, 2, 2, 10, 30).getTime());
    });
  });
});
