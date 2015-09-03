###
@todo
###

# -- Components
Autocomplete           = require './autocomplete'
Dropdown               = require './dropdown'
Input                  = require './input'
Switch                 = require './switch'
# -- Constants
TYPE =
  AUTOCOMPLETE: 'autocomplete'
  CHECKBOX    : 'checkbox'
  DROPDOWN    : 'dropdown'
  LABEL       : 'label'
  RADIO       : 'radio'
  SWITCH      : 'switch'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    attributes        : React.PropTypes.array
    className         : React.PropTypes.string
    label             : React.PropTypes.string
    value             : React.PropTypes.any
    onChange          : React.PropTypes.func

  getDefaultProps: ->
    attributes        : []
    className         : ''

  getInitialState: ->
    attributes        : @props.attributes
    type              : _determineType @props.attributes

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    if attributes = next_props.attributes
      @setState attributes: attributes, type: _determineType attributes
      @setValue next_props.value or @props.value

  componentDidUpdate: ->
    if @state.type is TYPE.RADIO
      no_active = true
      no_active = false for key, ref of @refs when ref.getValue?() is true
      @refs[default].setValue true if no_active and default = Object.keys(@refs)?[0]

  # -- Events
  onChange: (event) ->
    if @state.type is TYPE.RADIO
      for ref, el of @refs when el.refs.input.getDOMNode() isnt event.target
        el.setValue false

    is_valid = true
    value = @getValue()
    for attr in @state.attributes when attr.required and value[attr.ref]?.trim() is ''
      is_valid = false
      @refs[attr.ref].setError? 'Required field'
      break
    setTimeout (=> @props.onChange event, @), 10 if @props.onChange?

  # -- Render
  render: ->
    <div data-react-toolbox='fieldset'
              className={@props.className} onChange={@onChange}>
      { <label>{@props.label}</label> if @props.label }
      {
        for attribute, index in @state.attributes
          if attribute.type is TYPE.LABEL
            <label>{attribute.caption}</label>
          else if attribute.type is TYPE.AUTOCOMPLETE
            <Autocomplete key={index} {...attribute} onChange={@onChange}/>
          else if attribute.type is TYPE.DROPDOWN
            <Dropdown key={index} {...attribute} onChange={@onChange}/>
          else if attribute.type is TYPE.SWITCH
            <Switch key={index} {...attribute} onChange={@onChange}/>
          else
            <Input key={index} {...attribute} />
      }
      { @props.children }
    </div>

  # -- Extends
  clean: ->
    instance.setValue? undefined for key, instance of @refs

  getValue: ->
    value = {}
    if @state.type isnt TYPE.RADIO
      value[ref] = input.getValue() for ref, input of @refs when input.getValue?
    else
      value = ref for ref, input of @refs when input.getValue?() is true
    value

  setValue: (data = {}) ->
    if data instanceof Object
      @refs[key]?.setValue? value for key, value of data
    else
      @refs[key].setValue? key is data for key of @refs

# -- Internal methods
_determineType = (attributes) ->
  type = ''
  group_radio     = true
  group_checkbox  = true
  for attribute in attributes when attribute.type isnt TYPE.LABEL
    group_radio = false if attribute.type isnt TYPE.RADIO
    group_checkbox = false if attribute.type isnt TYPE.CHECKBOX
  type = TYPE.RADIO if group_radio
  type = TYPE.CHECKBOX if group_checkbox
  type
