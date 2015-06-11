###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string.required
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    error       : React.PropTypes.string
    required    : React.PropTypes.bool
    disabled    : React.PropTypes.bool
    multiline   : React.PropTypes.bool
    onChange    : React.PropTypes.func
    style       : React.PropTypes.object

  getDefaultProps: ->
    type        : "text"
    disabled    : false
    multiline   : false
    style       :
      borderBottom    : "solid 2px red"

  getInitialState: ->
    value       : @props.value

  # -- Events
  onChange: (event) ->
    @setState value: event.target.value
    @props.onChange? event, @

  # -- Render
  render: ->
    # -- styles
    style = ""
    style += " error" if @props.error
    # -- tag
    <div data-component-input={@props.type} className={style} style={@props.style}>
      {
        if @props.multiline
          <textarea {...@props} onChange={@onChange}>{@state.value}</textarea>
        else
          <input  {...@props} value={@state.value} onChange={@onChange} />
      }
      <span className="bar"></span>
      { <label>{@props.label}</label> if @props.label }
      { <span className="error">{@props.error}</span> if @props.error }
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data

  setError: (data = "Unknown error") ->
    @setState error: data
