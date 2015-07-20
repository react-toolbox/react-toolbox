"use strict"

# -- Components
Aside         = require './components/aside'
Autocomplete  = require './components/autocomplete'
Button        = require './components/button'
Card          = require './components/card'
Dialog        = require './components/dialog'
Dropdown      = require './components/dropdown'
FontIcon      = require './components/font_icon'
Form          = require './components/form'
Progress      = require './components/progress'
Switch        = require './components/switch'

# React           = require('react/addons')
# TestUtils       = React.addons.TestUtils
# shallowRenderer = TestUtils.createRenderer()

# shallowRenderer.render(React.createElement(MyComponent, { className: 'MyComponent' }, 'some child text'))
#
# component = shallowRenderer.getRenderOutput();


Test = React.createClass

  # -- Render
  render: ->
    <app data-toolbox={true}>
      <h1>React-Kit <small>New way for create</small></h1>

      <Card />
      <Switch />
      <Aside />
      <Autocomplete />
      <Button />
      <Dialog />
      <Dropdown />
      <FontIcon />
      <Form />
      <Progress />
    </app>

React.render <Test/>, document.body
