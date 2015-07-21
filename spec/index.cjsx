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
Slider        = require './components/slider'
Switch        = require './components/switch'

Test = React.createClass

  # -- Render
  render: ->
    <app data-toolbox={true}>
      <h1>React-Toolbox <small>New way for create</small></h1>

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
      <Slider />
    </app>

React.render <Test/>, document.body
