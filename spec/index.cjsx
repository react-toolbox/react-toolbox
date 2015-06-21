"use strict"

# -- Components
Aside   = require './components/aside'
Button  = require './components/button'

Test = React.createClass
  # -- Render
  render: ->
    <test>
      <h1>React-Kit <small>New way for create</small></h1>

      <Aside />
      <Button />
    </test>

React.render <Test/>, document.body
