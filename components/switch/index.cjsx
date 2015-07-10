require './style'
Ripple = require "../ripple"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    disabled  : React.PropTypes.bool
    label     : React.PropTypes.string
    onChange  : React.PropTypes.func
    value     : React.PropTypes.bool

  getDefaultProps: ->
    className : ""

  getInitialState: ->
    value     : @props.value
    ripple    : undefined

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    @setState value: next_props.value if next_props.value

  # -- Events
  onClick: (event) ->
    unless @props.disabled
      @setState
        value : not @state.value
        ripple: change: true
      @props.onChange? event, @

  # -- Render
  render: ->
    className = @props.className
    className += " checked" if @state.value
    className += " disabled" if @props.disabled
    <div data-component-switch className={className} onClick={@onClick}>
      <span></span>
      { <label>{@props.label}</label> if @props.label }
      <Ripple origin={@state.ripple} />
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data
