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
    @props.onSubmit? event, @getValue()

  onChange: (event) ->
    console.log "form.onChange"
    is_valid = true
    values = @getValue()
    # for attr in @props.attributes when attr.required and values[attr.ref].trim() is ""
    #   console.log attr.ref
    #   is_valid = false
    #   break

    console.log "is_valid", is_valid
    # @TODO: Handler if have errors
    # @props.onChange? event, @getValue()

  # -- Render
  render: ->
    <form onSubmit={@onSubmit} onChange={@onChange}>
    {
      for attribute, index in @props.attributes
        <Input  ref={attribute.ref}
                type={attribute.type}
                value={attribute.value}
                label={attribute.label}
                required={attribute.required}
                disabled={attribute.disabled}/>
    }
      <button>submit</button>
    </form>

  # -- Extends
  getValue: ->
    value = {}
    value[ref] = el.getValue() for ref, el of @refs
    value

  setValue: ->
    @
