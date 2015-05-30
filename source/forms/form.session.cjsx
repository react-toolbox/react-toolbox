###
@todo
###

# -- components
Button         = require "../components/button"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    active    : React.PropTypes.boolean
    context   : React.PropTypes.string
    onSuccess : React.PropTypes.function

  getInitialState: ->
    disabled : true

  # -- Events
  onKeyUp: (event) ->
    values = @_getFormValues()
    @setState disabled: not(values.mail and values.password)

  onSign: (event) ->
    event.preventDefault()
    button = @refs.button.getDOMNode().classList
    button.add "loading"
    @props.onSuccess.call @props.onSuccess, token: "1"


  componentDidMount: ->
    setTimeout =>
      @setState active: true
    , 450

  # -- Render
  render: ->
    label = if @props.context is "login" then "Sign In" else "Sign Up"
    <form data-flex="vertical" className="session">
      <h1>Welcome...</h1>
      <input ref="mail" type="text" placeholder="mail" onKeyUp={@onKeyUp} className="transparent"/>
      <input ref="password" type="password" placeholder="password" onKeyUp={@onKeyUp} className="transparent"/>
      <Button ref="button" caption={label} onClick={@onSign} disabled={@state.disabled} style="primary" />
      {
        if @props.context is "login"
          <a href="#/session/signup">Dont have an account? <strong>Sign Up</strong></a>
        else
          <a href="#/session/login">You have an account, <strong>Sign In</strong></a>
      }
    </form>

  # -- Private methods
  _getFormValues: ->
    mail      : @refs.mail.getDOMNode().value.trim()
    password  : @refs.password.getDOMNode().value.trim()
