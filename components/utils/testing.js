import React from 'react';
import TestUtils from 'react-dom/test-utils';

export default {
  renderComponent(Component, props = {}, state = {}) {
    const component = TestUtils.renderIntoDocument(<Component {...props} />);
    if (state !== {}) { component.setState(state); }
    return component;
  },

  shallowRenderComponent(component, props, ...children) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(component, props, children.length > 1
      ? children
      : children[0],
    ));
    return shallowRenderer.getRenderOutput();
  },
};
