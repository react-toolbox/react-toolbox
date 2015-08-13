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
Calendar      = require './components/calendar'
DatePicker    = require './components/date_picker'
Clock         = require './components/clock'

Test = React.createClass

  # -- Render
  render: ->
    <app data-toolbox={true}>
      <h1>React-Toolbox <small>New way for create</small></h1>

      <Clock />
    </app>

React.render <Test/>, document.body
