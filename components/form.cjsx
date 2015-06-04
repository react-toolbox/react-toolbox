###
@todo
###

Input     = require "./input"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    attributes        : React.PropTypes.array.required
    storage           : React.PropTypes.bool
    # -- Events
    onSubmit          : React.PropTypes.func
    onError           : React.PropTypes.func
    onValid           : React.PropTypes.func

  getDefaultProps: ->
    storage           : false

  getInitialState: ->
    attributes        : @props.attributes

  # -- Events
  onSubmit: (event) ->
    event.preventDefault()
    @props.onSubmit? event, @

  onChange: (event) ->
    is_valid = true
    value = @getValue()
    for attr in @props.attributes when attr.required and value[attr.ref]?.trim() is ""
      is_valid = false
      @refs[attr.ref].setError?()
      break
    @props[if is_valid then "onValid" else "onError"]? event, @
    @props.onChange? event, @

  # -- Render
  render: ->
    <form data-component-form
          onSubmit={@onSubmit}
          onChange={@onChange}>
    {
      for attribute, index in @props.attributes
        <Input {...attribute} />
    }
    </form>

  # -- Extends
  getValue: ->
    value = {}
    value[ref] = el.getValue() for ref, el of @refs
    value

  setValue: (data) ->
    @setState attributes: data
