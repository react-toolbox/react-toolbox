React     = require('react/addons')
TestUtils = React.addons.TestUtils

module.exports =
  # Generates a shallow render for a given component with properties and children
  shallowRenderComponent: (component, props, children...) ->
    shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(React.createElement(component, props,
      children.length > 1 ? children : children[0]))
    shallowRenderer.getRenderOutput()
