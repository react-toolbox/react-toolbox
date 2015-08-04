localCSS      = require './style'
Autocomplete  = require '../autocomplete'
Dropdown      = require '../dropdown'
Button        = require '../button'
Input         = require '../input'
Switch        = require '../switch'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    attributes        : React.PropTypes.array
    className         : React.PropTypes.string
    onChange          : React.PropTypes.func
    onError           : React.PropTypes.func
    onSubmit          : React.PropTypes.func
    onValid           : React.PropTypes.func
    storage           : React.PropTypes.string

  getDefaultProps: ->
    attributes        : []
    className         : ''

  getInitialState: ->
    attributes        : @storage @props

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    if next_props.attributes
      attributes = @storage next_props
      @setState attributes: attributes
      @setValue (item for item in attributes)

  # -- Events
  onSubmit: (event) ->
    event.preventDefault()
    @props.onSubmit? event, @

  onChange: (event) ->
    is_valid = true
    value = @getValue()
    for attr in @state.attributes when attr.required and value[attr.ref]?.trim() is ""
      is_valid = false
      @refs[attr.ref].setError? 'Required field'
      break

    @props.onChange? event, @
    @storage @props, value if @props.storage
    if is_valid
      @refs.submit?.getDOMNode().removeAttribute 'disabled'
      @props.onValid? event, @
    else
      @refs.submit?.getDOMNode().setAttribute 'disabled', true
      @props.onError? event, @

  # -- Render
  render: ->
    className = "#{localCSS.root} #{@props.className}"
    <form data-react-toolbox='form' className={className}
          onChange={@onChange} onSubmit={@onSubmit}>
      {
        for attribute, index in @state.attributes
          if attribute.type is 'submit'
            <Button key={index} {...attribute} type='square' ref='submit' onClick={@onSubmit}/>
          else if attribute.type is 'autocomplete'
            <Autocomplete key={index} {...attribute} onChange={@onChange}/>
          else if attribute.type is 'dropdown'
            <Dropdown key={index} {...attribute} onChange={@onChange}/>
          else if attribute.type is 'switch'
            <Switch key={index} {...attribute} onChange={@onChange}/>
          else
            <Input key={index} {...attribute} />
      }
      { @props.children }
    </form>

  # -- Extends
  storage: (props, value) ->
    key = "react-toolbox-form-#{props.storage}"
    if value
      store = {}
      store[attr.ref] = value[attr.ref] for attr in props.attributes when attr.storage
      window.localStorage.setItem key, JSON.stringify store
    else if props.storage
      store = JSON.parse window.localStorage.getItem key or {}
      input.value = store?[input.ref] or input.value for input in props.attributes
    props.attributes

  getValue: ->
    value = {}
    for ref, el of @refs when el.getValue?
      if ref.indexOf('.') is -1
        value[ref] = el.getValue()
      else
        parent = value
        for attr, index in hierarchy = ref.split('.')
          if index is hierarchy.length - 1
            parent[attr] = el.getValue()
          else
            parent[attr] = parent[attr] or {}
            parent = parent[attr]
    value

  setValue: (data = {}) ->
    @refs[field.ref].setValue? field.value for field in data
