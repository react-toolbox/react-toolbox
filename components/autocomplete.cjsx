###
@todo
###

Style = require './style/autocomplete'
Input = require './input'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    error       : React.PropTypes.string
    required    : React.PropTypes.bool
    disabled    : React.PropTypes.bool
    multiline   : React.PropTypes.bool
    dataSource  : React.PropTypes.array
    onChange    : React.PropTypes.func

  getDefaultProps: ->
    type        : "text"
    dataSource  : []

  getInitialState: ->
    focus       : false
    sugerences  : []
    values      : []

  # -- Events
  onChange: ->
    sugerences = []
    value = @refs.input.getValue().toLowerCase().trim()
    if value.length > 0
      for data in @props.dataSource when data not in @state.values
        sugerences.push data if data.toLowerCase().trim().indexOf(value) is 0
      @setState focus: true, sugerences: sugerences if sugerences.length > 0
    @setState focus: false if sugerences.length is 0

  onSelect: (event) ->
    values = @state.values
    values.push @state.sugerences[event.target.getAttribute "id"]
    @setState focus: false, values: values
    @refs.input.setValue ""
    @props.onChange? @

  onUnselect: (event) ->
    values = @state.values
    values.splice parseInt(event.target.getAttribute "id"), 1
    @setState focus: false, values: values
    @props.onChange? @

  # -- Render
  render: ->
    className = ""
    className += " focus" if @state.focus
    <div data-component-autocomplete={@props.type} className={className}>
      <ul data-role="values" data-flex="horizontal wrap" onClick={@onUnselect}>
      {<li id={index}>{value}</li> for value, index in @state.values}
      </ul>
      <Input {...@props} ref="input" onChange={@onChange}/>
      <ul data-role="sugerences" onClick={@onSelect}>
      {<li id={index}>{sugerence}</li> for sugerence, index in @state.sugerences}
      </ul>
    </div>

  # -- Extends
  getValue: ->

  setValue: ->

  setError: ->
