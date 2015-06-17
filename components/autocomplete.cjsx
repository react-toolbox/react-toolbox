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

  # -- Events
  onChange: ->
    value = @refs.input.getValue().toLowerCase().trim()
    if value.length > 0
      sugerences = []
      for data in @props.dataSource
        sugerences.push data if data.toLowerCase().trim().indexOf(value) > -1
      @setState focus: true, sugerences: sugerences if sugerences.length > 0
    else
      @setState focus: false

  onSelect: (event)->
    @setState focus: false
    @props.onChange? @

  # -- Render
  render: ->
    className = ""
    className += " focus" if @state.focus
    <div data-component-autocomplete={@props.type} className={className}>
      <ul data-role="selected"></ul>
      <Input {...@props} ref="input" onChange={@onChange}/>
      <ul data-role="sugerences" onClick={@onSelect}>
      { <li id={index}>{sugerence}</li> for sugerence, index in @state.sugerences }
      </ul>
    </div>

  # -- Extends
  getValue: ->

  setValue: ->

  setError: ->
