###
v2
  - can set a icon like dispatcher
  - can set different template (maybe use a kind of mixin )
###

require './style'
Ripple = require "../ripple"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    dataSource  : React.PropTypes.object
    disabled    : React.PropTypes.disabled
    label       : React.PropTypes.string
    onChange    : React.PropTypes.func
    type        : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ""
    dataSource  : {}
    disabled    : false
    type        : "normal"

  getInitialState: ->
    active      : false
    value       : @props.value or Object.keys(@props.dataSource)[0]
    ripple      : undefined

  # -- Events
  onSelect: (event) ->
    @setState active: true, ripple: undefined unless @props.disabled

  onItem: (event) ->
    unless @props.disabled
      target = event.target
      client = target.getBoundingClientRect?()
      @setState
        active    : false
        value     : target.getAttribute "id"
        ripple :
          left    : event.pageX - client?.left
          top     : event.pageY - client?.top
          width   : (client?.width * 2)
      @props.onChange event, @

  # -- Render
  render: ->
    className = @props.className
    className += " disabled" if @props.disabled
    if @state.active is true
      className += " active"
      stylesheet = height: @refs.value.getDOMNode().offsetHeight * Object.keys(@props.dataSource).length

    <div data-component-dropdown={@props.type} className={className}>
      { <label>{@props.label}</label> if @props.label }
      <ul  style={stylesheet}>
      {
        for key, label of @props.dataSource
          <li id={key} onClick={@onItem} className={"selected" if key is @state.value}>
            {label}
            { <Ripple origin={@state.ripple}/> if key is @state.value }
          </li>
      }
      </ul>
      <span ref="value" onClick={@onSelect}>{@props.dataSource[@state.value]}</span>
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data
