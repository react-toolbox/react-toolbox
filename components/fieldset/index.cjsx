###
@todo
###

Autocomplete  = require '../autocomplete'
Dropdown      = require '../dropdown'
Input         = require '../input'
Switch        = require '../switch'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    attributes        : React.PropTypes.array
    className         : React.PropTypes.string
    label             : React.PropTypes.string
    onChange          : React.PropTypes.func

  getDefaultProps: ->
    attributes        : []

  getInitialState: ->
    attributes        : @props.attributes
    value_object      : _determineTypeOfValue @props.attributes

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    if attributes = next_props.attributes
      @setState attributes: attributes, value_object: _determineTypeOfValue attributes
      @setValue attributes

  # -- Events
  onChange: (event) ->
    unless @state.value_object
      for ref, el of @refs when el.refs.input.getDOMNode() isnt event.target
        el.setValue false

    is_valid = true
    value = @getValue()
    for attr in @state.attributes when attr.required and value[attr.ref]?.trim() is ''
      is_valid = false
      @refs[attr.ref].setError? 'Required field'
      break
    setTimeout (=> @props.onChange? event, @), 10

  # -- Render
  render: ->
    <fieldset data-react-toolbox='fieldset'
              className={@props.className} onChange={@onChange}>
      { <label>{@props.label}</label> if @props.label }
      {
        for attribute, index in @state.attributes
          if attribute.type is 'label'
            <label>{attribute.caption}</label>
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
    </fieldset>

  # -- Extends
  clean: ->
    instance.setValue? undefined for key, instance of @refs

  getValue: ->
    value = {}
    if @state.value_object
      value[ref] = input.getValue() for ref, input of @refs when input.getValue?
    else
      value = ref for ref, input of @refs when input.getValue?() is true
    value

  setValue: (data = []) ->
    @refs[field.ref]?.setValue? field.value for field in data

# -- Internal methods
_determineTypeOfValue = (attributes) ->
  value_object = false
  for attribute in attributes when attribute.type not in ['label', 'radio']
    value_object = true
    break
  value_object
