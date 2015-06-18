###
@todo
###

Style = require './style/autocomplete'
Input = require './input'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    dataSource  : React.PropTypes.object #or React.PropTypes.array
    multiple    : React.PropTypes.bool
    exact       : React.PropTypes.bool
    # -- Inherit for <Input/>
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    error       : React.PropTypes.string
    required    : React.PropTypes.bool
    disabled    : React.PropTypes.bool
    onChange    : React.PropTypes.func

  getDefaultProps: ->
    type        : "text"
    dataSource  : {}
    multiple    : true
    exact       : true

  getInitialState: ->
    focus       : false
    dataSource  : _index @props.dataSource
    sugestions  : {}
    values      : {}

  # -- Events
  onFocus: ->
    @refs.sugestions.getDOMNode().scrollTop = 0
    @setState focus: true, sugestions: @_getSugestions()

  onBlur: (event) ->
    setTimeout (=> @setState focus: false, sugestions: {}), 300

  onChange: ->
    sugestions = {}
    value = @refs.input.getValue().toLowerCase().trim()
    if value.length > 0
      @setState focus: true, sugestions: sugestions = @_getSugestions value
    @setState focus: false if Object.keys(sugestions).length is 0

  onKeyPress: (event) ->
    query = @refs.input.getValue().trim()
    if event.which is 13 and query isnt ""
      for key, label of @state.sugestions when query.toLowerCase() is label.toLowerCase()
        sugestion = {"#{key}": label}
        break
      unless @props.exact
        @_addValue sugestion or {"#{query}": query}
      else if sugestion
        @_addValue sugestion

  onSelect: (event) ->
    key = event.target.getAttribute "id"
    @_addValue {"#{key}": @state.sugestions[key]}

  onDelete: (event) ->
    delete @state.values[event.target.getAttribute "id"]
    @setState focus: false, values: @state.values
    @props.onChange? @

  # -- Render
  render: ->
    <div data-component-autocomplete={@props.type}
         className={className = "focus" if @state.focus}>
      {
        if @props.multiple
          <ul data-role="values" data-flex="horizontal wrap" onClick={@onDelete}>
            {<li id={key}>{label}</li> for key, label of @state.values}
          </ul>
      }
      <Input {...@props} ref="input" onChange={@onChange}
             onKeyPress={@onKeyPress} onFocus={@onFocus} onBlur={@onBlur}/>
      <ul ref="sugestions" data-role="sugestions" onClick={@onSelect}>
        {<li id={key}>{label}</li> for key, label of @state.sugestions}
      </ul>
    </div>

  # -- Extends
  getValue: ->
    if @props.multiple
      (key for key of @state.values)
    else
      Object.keys(@state.values)?[0]

  setValue: ->
    # @TODO

  setError: (data) ->
    @refs.input.setError data

  # -- Internal methods
  _addValue: (value) ->
    key = Object.keys(value)[0]
    if @props.multiple
      values = @state.values
      values[key] = value[key]
    else
      values = value
    @setState focus: false, values: values
    @refs.input.setValue if @props.multiple then "" else value[key]
    @props.onChange? @

  _getSugestions: (query) ->
    sugestions = {}
    for key, label of @state.dataSource when not @state.values[key]
      if not query or label.toLowerCase().trim().indexOf(query) is 0
        sugestions[key] = label
    sugestions

# -- Private methods
_index = (data = {}) ->
  indexed = data
  if data.length?
    indexed = {}
    indexed[item] = item for item in data
  indexed
