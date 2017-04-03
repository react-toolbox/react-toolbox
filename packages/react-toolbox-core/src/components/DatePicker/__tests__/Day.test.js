import React from 'react';
import { T } from 'ramda';
import { shallow } from 'enzyme';
import createElement from '../../../utils/createElement';

describe('<Day />', () => {
  const day = new Date(2017, 2, 1);
  let mockIsToday;
  let dayFactory;
  let DayNode;
  let Day;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.unmock('date-fns/is_today');
  });

  describe('when day is Today', () => {
    beforeAll(() => {
      mockIsToday = jest.fn(() => true);
      jest.mock('date-fns/is_today', () => mockIsToday);
      dayFactory = require('../Day').default;
      DayNode = createElement('DayNode');
      Day = dayFactory({ DayNode });
    });

    it('passes today prop as true', () => {
      const wrapper = shallow(<Day day={day} />);
      const isToday = wrapper.find(DayNode).prop('today');
      expect(isToday).toEqual(true);
      expect(mockIsToday).toHaveBeenCalledWith(day);
    });
  })

  describe('when day is not Today', () => {
    beforeAll(() => {
      mockIsToday = jest.fn(() => false);
      jest.mock('date-fns/is_today', () => mockIsToday);
      dayFactory = require('../Day').default;
      DayNode = createElement('DayNode');
      Day = dayFactory({ DayNode });
    });

    it('passes today prop as false', () => {
      const day = new Date(2017, 2, 1);
      const wrapper = shallow(<Day day={day} />)
      const isToday = wrapper.find(DayNode).prop('today');
      expect(isToday).toEqual(false);
      expect(mockIsToday).toHaveBeenCalledWith(day);
    });

    it('passes disabled when day is disabled', () => {
      const isDayDisabled = jest.fn(() => true);
      const wrapper = shallow(
        <Day
          day={day}
          isDayDisabled={isDayDisabled}
          viewDate={day}
        />
      );
      const disabled = wrapper.find(DayNode).prop('disabled');
      expect(disabled).toEqual(true);
      expect(isDayDisabled).toHaveBeenCalledWith(day);
    });

    it('passes highlighted when day is in highlighted range', () => {
      const highlighted = { from: new Date(2017, 1, 15), to: new Date(2017, 2, 15) };
      const wrapper = shallow(
        <Day
          day={day}
          highlighted={highlighted}
          viewDate={day}
        />
      );
      const isHighlighted = wrapper.find(DayNode).prop('highlighted');
      expect(isHighlighted).toEqual(true);
    });

    it('passes inRange when day is in selected range', () => {
      const selected = { from: new Date(2017, 1, 15), to: new Date(2017, 2, 15) };
      const wrapper = shallow(
        <Day
          day={day}
          selected={selected}
          viewDate={day}
        />
      );
      const inRange = wrapper.find(DayNode).prop('inRange');
      expect(inRange).toEqual(true);
    });

    it('passes selected when day is selected in from', () => {
      const selected = { from: new Date(2017, 1, 15), to: new Date(2017, 2, 15) };
      const wrapper = shallow(
        <Day
          day={selected.from}
          selected={selected}
          viewDate={selected.from}
        />
      );
      expect(wrapper.find(DayNode).prop('selected')).toEqual(true);
      expect(wrapper.find(DayNode).prop('selectedSource')).toEqual('from');
    });

    it('passes selected when day is selected in to', () => {
      const selected = { from: new Date(2017, 1, 15), to: new Date(2017, 2, 15) };
      const wrapper = shallow(
        <Day
          day={selected.to}
          selected={selected}
          viewDate={selected.to}
        />
      );
      expect(wrapper.find(DayNode).prop('selected')).toEqual(true);
      expect(wrapper.find(DayNode).prop('selectedSource')).toEqual('to');
    });
  });
});
