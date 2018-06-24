import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';

export default {
  renderComponent (Component, props = {}, state = {}) {
    const component = TestUtils.renderIntoDocument(<Component {...props} />);
    if (state !== {}) { component.setState(state); }
    return component;
  },

  shallowRenderComponent (component, props, ...children) {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
    return shallowRenderer.getRenderOutput();
  }
};
