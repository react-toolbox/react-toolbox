"use strict"

# -- Components
Aside         = require './components/aside'

Test = React.createClass
  # -- Render
  render: ->
    <test>
      <h1>React-Kit <small>New way for create</small></h1>

      <Aside />
    </test>

React.render <Test/>, document.body
