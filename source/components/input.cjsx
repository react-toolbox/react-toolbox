###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    type        : React.PropTypes.string
    disabled    : React.PropTypes.boolean
    onChange    : React.PropTypes.function

  getDefaultProps: ->
    type        : "text"
    disabled    : false

  # -- Events
  onChange: (event) ->
    console.log "onChange"

  # -- Render
  render: ->
    <div data-component="input">
      <input
        type={@props.type}
        value={@props.value}
        placeholder={@props.hint} 
        disabled={@props.disabled}
        required={@props.required} />
      <span className="bar"></span>
      { <label>{@props.label}</label> if @props.label }
      { <span className="error">{@props.error}</span> if @props.error }
    </div>
