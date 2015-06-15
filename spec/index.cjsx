"use strict"

# -- Components
Button    = require "../components/button"
Form      = require "../components/form"

Dialog    = require './examples/dialog'

Test = React.createClass
  getInitialState: ->
    submitable      : false

  onInputChange: (event, input) ->
    console.log "onInputChange -> #{input.getValue()}"

  onFormValid: (event, form) ->
    console.log "onFormValid", form.getValue()
    @setState submitable: true

  onFormError: (event, form) ->
    console.log "onFormError", form.getValue()
    @setState submitable: false

  onButtonClick: (event, button) ->
    console.log "onButtonClick", button

  onShowDialog: ->
    console.log "onShowDialog"
    @refs.dialog.show()

  # -- Render
  render: ->
    attributes = [
      ref: "name", label: "Your Name", required: true#, onChange: @onInputChange
    ,
      ref: "description", multiline: true, label: "Description", value: "Doer"
    ,
      ref: "birthdate", type: "date", label: "Birthdate"
    ,
      ref: "years", type: "number", label: "Years"
    ,
      ref: "twitter", label: "Nickname", disabled: true
    ,
      ref: "nomad", type: "checkbox", label: "Are you a nomad?", value: true
    ,
      ref: "cow", type: "checkbox", label: "Are you a cow?", value: false
    ,
      ref: "girl", type: "checkbox", label: "Are you a girl?", value: false, disabled: true
    ,
      ref: "nomad_2", type: "radio", label: "Are you a nomad_2?", value: true
    ,
      ref: "cow_2", type: "radio", label: "Are you a cow_2?", value: false
    ,
      ref: "girl_2", type: "radio", label: "Are you a girl_2?", value: false, disabled: true
    ,
      type: "submit", caption: "Send", style: "primary anchor", disabled: true
    ]

    <app>
      <h1>React-Kit <small>New way for create</small></h1>
      <br/>

      <h2>Forms</h2>
      <Form attributes={attributes} />

      <br/>
      <h2>Buttons</h2>
      <Button caption="Show dialog" onClick={@onShowDialog}/>


      <Button caption="Login" disabled={not @state.submitable} />
      <Button caption="Primary" style="primary" icon="access_alarm" />
      <Button caption="Secondary" style="secondary" onClick={@onButtonClick}/>
      <Button caption="Disabled" disabled={true} onClick={@onButtonClick}/>

      <Button type="circle" icon="access_alarm" disabled={not @state.submitable} />
      <Button type="circle" icon="explore" style="primary" />
      <Button type="circle" icon="zoom_in" style="secondary" />
      <Button type="circle" icon="input" disabled={true} />

      # -- Dialog
      <Dialog ref="dialog" />
    </app>

React.render <Test/>, document.body
