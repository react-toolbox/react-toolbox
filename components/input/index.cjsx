###
@todo
###

require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    label       : React.PropTypes.string
    value       : React.PropTypes.string
    error       : React.PropTypes.string
    required    : React.PropTypes.bool
    disabled    : React.PropTypes.bool
    multiline   : React.PropTypes.bool
    onChange    : React.PropTypes.func
    onKeyPress  : React.PropTypes.func
    onFocus     : React.PropTypes.func
    onBlur      : React.PropTypes.func

  getDefaultProps: ->
    type        : "text"
    required    : false
    disabled    : false
    multiline   : false

  getInitialState: ->
    value       : @props.value
    checked     : @props.value
    error       : @props.error
    touch       : @props.type in ["checkbox", "radio"]

  # -- Events
  onChange: (event) ->
    if @state.touch
      @setState checked: event.target.checked, error: undefined
    else
      @setState value: event.target.value, error: undefined
    @props.onChange? event, @

  # -- Render
  render: ->
    className = ""
    className += " disabled" if @props.disabled
    className += " error" if @state.error
    className += " touch" if @state.touch
    className += " radio" if @props.type is "radio"
    className += " checked" if @state.checked

    <div data-component-input={@props.type} className={className}>
      {
        if @props.multiline
          <textarea ref="input" {...@props} value={@state.value}
                    onChange={@onChange}
                    onKeyPress={@props.onKeyPress}
                    onFocus={@props.onFocus}
                    onBlur={@props.onBlur}>{@state.value}</textarea>
        else
          <input ref="input" {...@props} value={@state.value} checked={@state.checked} 
                 onChange={@onChange}
                 onKeyPress={@props.onKeyPress}
                 onFocus={@props.onFocus}
                 onBlur={@props.onBlur}/>
      }
      <span className="bar"></span>
      { <label>{@props.label}</label> if @props.label }
      { <span className="error">{@state.error}</span> if @state.error }
    </div>

  # -- Extends
  getValue: ->
    @refs.input?.getDOMNode()[if @state.touch then "checked" else "value"]

  setValue: (data) ->
    @setState value: data

  setError: (data = "Unknown error") ->
    @setState error: @props.error or data
