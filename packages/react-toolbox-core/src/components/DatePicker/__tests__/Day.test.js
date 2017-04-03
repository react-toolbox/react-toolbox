import React from 'react';
import { T } from 'ramda';
import { shallow } from 'enzyme';
import createElement from '../../../utils/createElement';

describe('<Day />', () => {
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
      const day = new Date(2017, 2, 1);
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

    it('renders a simple Day', () => {
      const day = new Date(2017, 2, 1);
      const wrapper = shallow(<Day day={day} />)
      const isToday = wrapper.find(DayNode).prop('today');
      expect(isToday).toEqual(false);
      expect(mockIsToday).toHaveBeenCalledWith(day);
    });
  });
});
