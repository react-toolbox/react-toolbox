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
    dataSource  : React.PropTypes.array
    disabled    : React.PropTypes.bool
    label       : React.PropTypes.string
    onChange    : React.PropTypes.funca
    template    : React.PropTypes.func
    type        : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ""
    dataSource  : []
    type        : "normal"

  getInitialState: ->
    active      : false
    ripple      : undefined
    selected    : _selectValue @props.value, @props.dataSource

  # -- Lifecycle
  componentDidMount: ->
    @setState
      height: @refs.values.getDOMNode().firstElementChild.getBoundingClientRect().height

  componentDidUpdate: (prev_props, prev_state) ->
    @props.onChange? @ if prev_state.selected isnt @state.selected and prev_state.active

  # -- Events
  onSelect: (event) ->
    @setState active: true, ripple: undefined unless @props.disabled

  onItem: (event) ->
    unless @props.disabled
      client = event.target.getBoundingClientRect?()
      value = event.target.getAttribute("id").toString()
      for item in @props.dataSource when item.value.toString() is value
        @setState
          active    : false
          selected  : item
          ripple :
            left    : event.pageX - client?.left
            top     : event.pageY - client?.top
            width   : (client?.width * 2)
        break

  # -- Render
  render: ->
    className = @props.className
    className += " disabled" if @props.disabled
    if @state.active is true
      className += " active"
      stylesheet = height: @state.height * @props.dataSource.length

    <div data-component-dropdown={@props.type} className={className}>
      { <label>{@props.label}</label> if @props.label }
      <ul ref="values" style={stylesheet} onClick={@onItem}>
      {
        for item, index in @props.dataSource
          <li id={item.value} key={index} className={"selected" if item.value is @state.selected.value}>
            { if @props.template then @props.template item else item.label }
            { <Ripple origin={@state.ripple}/> if item.value is @state.selected.value }
          </li>
      }
      </ul>
      <div ref="value" onClick={@onSelect}>
      {
        if @props.template
          @props.template @state.selected
        else
          <span>{@state.selected.label}</span>
      }
      </div>
    </div>

  # -- Extends
  getValue: ->
    @state.selected.value

  setValue: (data) ->
    @setState selected: data

# -- Internal methods
_selectValue = (value, dataSource) ->
  if value
    for item in dataSource when item.value.toString() is value.toString()
      return item
      break
  else
    dataSource[0]
