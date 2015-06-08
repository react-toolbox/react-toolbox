"use strict"

# -- Components
Input     = require "../components/input"
Form      = require "../components/form"
Button    = require "../components/button"
FontIcon  = require "../components/font_icon"

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

  # -- Render
  render: ->
    attributes = [
      ref: "name", label: "Your Name", required: true
    ,
      ref: "description", multiline: true, label: "Description", value: "Doer"
    ,
      ref: "years", type: "number", label: "Years"
    ,
      ref: "twitter", label: "Nickname", disabled: true
    ,
    ]

    <app>
      <h1>Hello World !</h1>
      <Form attributes={attributes}
            onError={@onFormError}
            onValid={@onFormValid}/>
      # <Button caption="Login" disabled={not @state.submitable} />
      # <Button caption="Primary" style="primary" icon="access_alarm" />
      # <Button caption="Secondary" style="secondary" onClick={@onButtonClick}/>
      # <Button caption="Disabled" disabled={true} onClick={@onButtonClick}/>
      #
      # <Button type="circle" icon="access_alarm" disabled={not @state.submitable} />
      # <Button type="circle" icon="explore" style="primary" />
      # <Button type="circle" icon="zoom_in" style="secondary" />
      # <Button type="circle" icon="input" disabled={true} />
      #
      <FontIcon value="access_alarm" />
    </app>

React.render <Test/>, document.body
