TestUtils = React.addons.TestUtils

module.exports =
  renderComponent: (Component, props={}, state={}) ->
    component = TestUtils.renderIntoDocument(<Component {...props}/>)
    component.setState(state) unless state == {}
    component

  shallowRenderComponent: (component, props, children...) ->
    shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(React.createElement(component, props,
      children.length > 1 ? children : children[0]))
    shallowRenderer.getRenderOutput()
