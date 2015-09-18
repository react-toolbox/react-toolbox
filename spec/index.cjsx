"use strict"

# -- Components
Aside         = require './components/aside'
Autocomplete  = require './components/autocomplete'
Button        = require './components/button'
Card          = require './components/card'
Calendar      = require '../components/calendar'
Dialog        = require './components/dialog'
Dropdown      = require './components/dropdown'
FontIcon      = require './components/font_icon'
Form          = require './components/form'
Progress      = require './components/progress'
Slider        = require './components/slider'
Switch        = require './components/switch'
Calendar      = require './components/calendar'
Pickers       = require './components/pickers'
Clock         = require '../components/clock'
Tabs          = require './components/tabs'

Test = React.createClass
  displayName: 'App'

  # -- Render
  render: ->
    <app data-toolbox={true}>
      <h1>React-Toolbox <small>New way for create</small></h1>
      <Aside />
      <Autocomplete />
      <Button />
      <Card />
      <Dialog />
      <Dropdown />
      <FontIcon />
      <Form />
      <Progress />
      <Slider />
      <Switch />
      <Tabs />
      <Pickers />
    </app>

React.render <Test/>, document.body
