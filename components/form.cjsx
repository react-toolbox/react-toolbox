###
@todo
###

Style     = require './style/form'
Button    = require "./button"
Input     = require "./input"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    attributes        : React.PropTypes.array
    storage           : React.PropTypes.bool
    # -- Events
    onSubmit          : React.PropTypes.func
    onError           : React.PropTypes.func
    onValid           : React.PropTypes.func
    onChange          : React.PropTypes.func

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
      @refs[attr.ref].setError? "Required field"
      break

    @props.onChange? event, @
    if is_valid
      @refs.submit?.getDOMNode().removeAttribute "disabled"
      @props.onValid? event, @
    else
      @refs.submit?.getDOMNode().setAttribute "disabled", true
      @props.onError? event, @

  # -- Render
  render: ->
    <form data-component-form
          onSubmit={@onSubmit}
          onChange={@onChange}>
    {
      for attribute, index in @props.attributes
        if attribute.type is "submit"
          <Button {...attribute} type="square" ref="submit" onClick={@onSubmit}/>
        else
          <Input {...attribute} />
    }
    </form>

  # -- Extends
  getValue: ->
    value = {}
    value[ref] = el.getValue() for ref, el of @refs when el.getValue?
    value

  setValue: (data) ->
    @setState attributes: data
