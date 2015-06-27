###
@todo
###

require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    className   : React.PropTypes.string
    dataSource  : React.PropTypes.object
    value       : React.PropTypes.string

  getDefaultProps: ->
    type        : "normal"
    className   : ""
    dataSource  : {}

  getInitialState: ->
    active      : false
    value       : @props.value or Object.keys(@props.dataSource)[0]

  # -- Events
  onSelect: (event) ->
    @setState active: true

  onItem: (event) ->
    @setState active: false, value: event.target.getAttribute "id"

  # -- Render
  render: ->
    className = @props.className
    if @state.active is true
      className += " active"
      stylesheet = height: @getDOMNode().offsetHeight * Object.keys(@props.dataSource).length
    <div data-component-dropdown={@props.type}
         className={className}>
      <span onClick={@onSelect}>{@props.dataSource[@state.value]}</span>
      <ul onClick={@onItem} style={stylesheet}>
      {
        for key, label of @props.dataSource
          <li id={key} className={"selected" if key is @state.value}>{label}</li>
      }
      </ul>
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data

# -- Private methods
_index = (data = {}) ->
  indexed = data
  if data.length?
    indexed = {}
    indexed[item] = item for item in data
  indexed
