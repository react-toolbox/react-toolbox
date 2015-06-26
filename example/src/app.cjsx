"use strict"

# React-Toolbox full dependency way:
# Toolbox = require 'react-toolbox'
# Button  = Toolbox.Button
# Form    = Toolbox.Form

# Standalone dependencies way:
Button  = require 'react-toolbox/components/button'
Form    = require 'react-toolbox/components/form'

App = React.createClass

  # --
  getInitialState: ->
    fields: [
      ref: "username", label: "Your username", required: true
    ,
      ref: "password", type: "password", label: "Your password", required: true
    ,
      type: "submit", caption: "Login", disabled: true
    ]

  render: ->
    <app>
      <h1>Hello React-Toolbox</h1>
      <Form attributes={@state.fields} />
      <Button caption="Hello world!" type="square" style="primary"/>
      <Button icon="adb" type="circle" style="secondary" />
    </app>

React.render <App/>, document.body
