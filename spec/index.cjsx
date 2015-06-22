"use strict"

# -- Components
Aside         = require './components/aside'
Autocomplete  = require './components/autocomplete'
Button        = require './components/button'
Dialog        = require './components/dialog'

Test = React.createClass
  # -- Render
  render: ->
    <test>
      <h1>React-Kit <small>New way for create</small></h1>

      <Aside />
      <Autocomplete />
      <Button />
      <Dialog />
    </test>

React.render <Test/>, document.body
