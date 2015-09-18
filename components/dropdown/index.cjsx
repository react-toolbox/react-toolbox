###
v2
  - can set a icon like dispatcher
###

localCSS  = require './style'
Ripple    = require '../ripple'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    dataSource  : React.PropTypes.array
    disabled    : React.PropTypes.bool
    label       : React.PropTypes.string
    onChange    : React.PropTypes.func
    template    : React.PropTypes.func
    type        : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ''
    dataSource  : []
    type        : 'normal'

  getInitialState: ->
    active      : false
    selected    : _selectValue @props.value, @props.dataSource

  # -- Lifecycle
  componentDidMount: ->
    @setState
      height: @refs.values.getDOMNode().firstElementChild.getBoundingClientRect().height

  componentDidUpdate: (prev_props, prev_state) ->
    @props.onChange? @ if prev_state.selected isnt @state.selected and prev_state.active

  # -- Events
  onSelect: (event) ->
    @setState active: true unless @props.disabled

  onItem: (id, event) ->
    unless @props.disabled
      value = id.toString()
      for item in @props.dataSource when item.value.toString() is value
        @setState
          active    : false
          selected  : item
        break

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type
    className += ' disabled'        if @props.disabled
    if @state.active is true
      className += ' active'
      stylesheet = height: @state.height * @props.dataSource.length

    <div data-react-toolbox='dropdown' className={className}>
      { <label>{@props.label}</label> if @props.label }
      <ul ref='values' className={localCSS.values} style={stylesheet}>
      {
        for item, index in @props.dataSource
          <li id={item.value} onClick={@onItem.bind(@, item.value)} key={index} style={{position: 'relative'}} className={'selected' if item.value is @state.selected.value}>
            {if @props.template then @props.template item else item.label }
            { <Ripple className={localCSS.ripple}/> }
          </li>
      }
      </ul>
      <div ref='value' className={localCSS.value} onClick={@onSelect}>
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
