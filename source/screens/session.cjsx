###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    active    : React.PropTypes.boolean
    context   : React.PropTypes.string
    onSuccess : React.PropTypes.function

  getInitialState: ->
    disabled: false

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
    <article data-screen="session" className={@state.active} data-flex="vertical center">
      <h1>Welcome...</h1>
      <form data-flex="vertical center">
        <input ref="mail" type="text" placeholder="mail" onKeyUp={@onKeyUp} className="transparent"/>
        <input ref="password" type="password" placeholder="password" onKeyUp={@onKeyUp} className="transparent"/>
        <button ref="button" onClick={@onSign} disabled={@state.disabled} className="radius white">
          <abbr>{ if @props.context is "login" then "Sign In" else "Sign Up"}</abbr>
        </button>
      </form>
      {
        if @props.context is "login"
          <a href="#/session/signup">Dont have an account? <strong>Sign Up</strong></a>
        else
          <a href="#/session/login">You have an account, <strong>Sign In</strong></a>
      }
      <small>Copyright 2015</small>
    </article>

  # -- Private methods
  _getFormValues: ->
    mail      : @refs.mail.getDOMNode().value.trim()
    password  : @refs.password.getDOMNode().value.trim()
