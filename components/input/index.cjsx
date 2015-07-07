require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    disabled    : React.PropTypes.bool
    error       : React.PropTypes.string
    label       : React.PropTypes.string
    multiline   : React.PropTypes.bool
    onBlur      : React.PropTypes.func
    onChange    : React.PropTypes.func
    onFocus     : React.PropTypes.func
    onKeyPress  : React.PropTypes.func
    required    : React.PropTypes.bool
    type        : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ""
    type        : "text"

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
    className = @props.className
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
