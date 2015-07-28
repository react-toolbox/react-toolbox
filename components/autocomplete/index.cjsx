localCSS  = require './style'
Input     = require '../input'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    colors      : React.PropTypes.object
    dataSource  : React.PropTypes.any
    disabled    : React.PropTypes.bool
    error       : React.PropTypes.string
    exact       : React.PropTypes.bool
    label       : React.PropTypes.string
    multiple    : React.PropTypes.bool
    onChange    : React.PropTypes.func
    required    : React.PropTypes.bool
    type        : React.PropTypes.string
    value       : React.PropTypes.any

  getDefaultProps: ->
    className   : ""
    colors      : {}
    dataSource  : {}
    exact       : true
    multiple    : true
    type        : "text"

  getInitialState: ->
    focus       : false
    dataSource  : _index @props.dataSource
    suggestions : {}
    values      : {}

  # -- Lifecycle
  componentDidMount: ->
    @setValue @props.value if @props.value

  componentWillReceiveProps: (next_props) ->
    @setState dataSource: _index next_props.dataSource if next_props.dataSource

  # -- Events
  onFocus: ->
    @refs.suggestions.getDOMNode().scrollTop = 0
    @setState focus: true, suggestions: @_getSuggestions()

  onChange: ->
    suggestions = {}
    value = @refs.input.getValue().toLowerCase().trim()
    if value.length > 0
      @setState focus: true, suggestions: suggestions = @_getSuggestions value
    @setState focus: false if Object.keys(suggestions).length is 0

  onKeyPress: (event) ->
    key_ascii = event.which
    query = @refs.input.getValue().trim()

    if @state.focus
      children = @refs.suggestions.getDOMNode().children
      for child, index in children when child.classList.contains "active"
        child.classList.remove "active"
        query = child.getAttribute "id"
        break

    if key_ascii is 13 and query isnt ""
      for key, label of @state.suggestions when query.toLowerCase() is label.toLowerCase()
        suggestion = {"#{key}": label}
        break
      unless @props.exact
        @_addValue suggestion or {"#{query}": query}
      else if suggestion
        @_addValue suggestion

    else if @state.focus and key_ascii in [40, 38]
      if key_ascii is 40
        index = if index >= children.length - 1 then 0 else index + 1
      else
        index = if index is 0 then children.length - 1 else index - 1
      children[index].classList.add "active"

  onBlur: (event) ->
    setTimeout (=> @setState focus: false, suggestions: {}), 300

  onSelect: (event) ->
    key = event.target.getAttribute "id"
    @_addValue {"#{key}": @state.suggestions[key]}

  onRefreshSelection: (event) ->
    children = @refs.suggestions.getDOMNode().children
    for child, index in children when child.classList.contains "active"
      child.classList.remove "active"
      break

  onDelete: (event) ->
    delete @state.values[event.target.getAttribute "id"]
    @setState focus: false, values: @state.values
    @props.onChange? @

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type
    className += " focus"           if @state.focus
    <div data-react-toolbox='autocomplete' className={className}>
      { <label>{@props.label}</label> if @props.label }
      {
        if @props.multiple
          <ul className={localCSS.values} data-flex="horizontal wrap"
              onClick={@onDelete}>
            {
              for key, label of @state.values
                <li key={key} id={key} style={backgroundColor: @props.colors[key]}>{label}</li>
            }
          </ul>
      }
      <Input {...@props} ref="input" value="" label=""
             onBlur={@onBlur}
             onChange={@onChange}
             onFocus={@onFocus}
             onKeyDown={@onKeyPress}
             />
      <ul ref="suggestions" className={localCSS.suggestions}
        onClick={@onSelect} onMouseEnter={@onRefreshSelection}>
        {<li key={key} id={key}>{label}</li> for key, label of @state.suggestions}
      </ul>
    </div>

  # -- Extends
  getValue: ->
    if @props.multiple
      (key for key of @state.values)
    else
      Object.keys(@state.values)?[0]

  setValue: (data = []) ->
    values = {}
    data = [data] if typeof data is 'string'
    values[key] = label for key, label of @state?.dataSource when key in data
    @state.values = values
    @setState values: values
    @refs.input.setValue values[Object.keys(values)?[0]] unless @props.multiple

  setError: (data) ->
    @refs.input.setError data

  # -- Internal methods
  _addValue: (value) ->
    key = Object.keys(value)[0]
    if @props.multiple
      values = @state.values
      values[key] = value[key]
      @props.onChange? @
    else
      values = value
      setTimeout (=> @props.onChange? @), 10
    @setState focus: false, values: values
    @refs.input.setValue if @props.multiple then "" else value[key]

  _getSuggestions: (query) ->
    suggestions = {}
    for key, label of @state.dataSource when not @state.values[key]
      if not query or label.toLowerCase().trim().indexOf(query) is 0
        suggestions[key] = label
    suggestions

# -- Private methods
_index = (data = {}) ->
  indexed = data
  if data.length?
    indexed = {}
    indexed[item] = item for item in data
  indexed
