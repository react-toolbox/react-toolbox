const React = window.React;
const TestUtils = React.addons.TestUtils;

module.exports = {

  renderComponent (Component, props = {}, state = {}) {
    let component = TestUtils.renderIntoDocument(<Component {...props} />);
    if (state !== {}) { component.setState(state); }
    return component;
  },

  shallowRenderComponent (component, props, ...children) {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
    return shallowRenderer.getRenderOutput();
  }

};
