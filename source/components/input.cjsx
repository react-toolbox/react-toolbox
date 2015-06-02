###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    type        : React.PropTypes.string
    required    : React.PropTypes.bool
    disabled    : React.PropTypes.bool
    # -- Events
    onChange    : React.PropTypes.func
    onBlur      : React.PropTypes.func
    onFocus     : React.PropTypes.func

  getDefaultProps: ->
    type        : "text"
    disabled    : false

  getInitialState: ->
    value       : @props.value

  # -- Events
  onChange: (event) ->
    value = event.target.value
    @setState value: value
    @props.onChange? event, value

  onBlur: (event) ->
    console.log "onBlur"
    @props.onBlur? event, value

  onFocus: (event) ->
    console.log "onFocus"
    @props.onFocus? event, value

  # -- Render
  render: ->
    <div data-component-input={@props.type}>
      <input
        type={@props.type}
        value={@state.value}
        placeholder={@props.hint} 
        disabled={@props.disabled}
        required={@props.required}
        onBlur={@onBlur}
        onFocus={@onFocus}
        onChange={@onChange}/>
      <span className="bar"></span>
      { <label>{@props.label}</label> if @props.label }
      { <span className="error">{@props.error}</span> if @props.error }
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data

  clearValue: ->
    @setState ""
