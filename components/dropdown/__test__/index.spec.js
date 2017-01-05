import expect from 'expect';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import sinon from 'sinon';
import theme from '../theme.scss';
import Dropdown from '../Dropdown';


describe('Dropdown', function () {
  describe('#renderValue', function () {
    const source = [
      { value: 'EN-gb', label: 'England' },
      { value: 'ES-es', label: 'Spain', disabled: true },
      { value: 'TH-th', label: 'Thailand', disabled: true },
      { value: 'EN-en', label: 'USA'}
    ];
    it('renders dropdown item with disabled style', function () {
      const tree = renderIntoDocument(<Dropdown theme={theme} source={source} />);
      const disabled = scryRenderedDOMComponentsWithClass(tree, theme.disabled);
      expect(disabled.length).toEqual(2);
    });
    it('does not call onChange callback when disabled dorpdown item is clicked', function () {
      const spy = sinon.spy();
      const tree = renderIntoDocument(<Dropdown
        theme={theme}
        source={source}
        value={source[0].value}
        onChange={spy}
      />);
      const disabled = scryRenderedDOMComponentsWithClass(tree, theme.disabled);
      expect(spy.called).toEqual(false);
      Simulate.click(disabled[0]);
      expect(spy.called).toEqual(false);
      const selected = scryRenderedDOMComponentsWithClass(tree, theme.selected);
      Simulate.click(selected[0]);
      expect(spy.called).toEqual(true);
    });
  });
});
