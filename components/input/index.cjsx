localCSS = require './style'

module.exports = React.createClass
  displayName   : 'Input'

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    disabled    : React.PropTypes.bool
    error       : React.PropTypes.string
    label       : React.PropTypes.string
    multiline   : React.PropTypes.bool
    onBlur      : React.PropTypes.func
    onChange    : React.PropTypes.func
    onKeyPress  : React.PropTypes.func
    onFocus     : React.PropTypes.func
    onBlur      : React.PropTypes.func
    required    : React.PropTypes.bool
    type        : React.PropTypes.string
    value       : React.PropTypes.any

  getDefaultProps: ->
    className   : ''
    disabled    : false
    multiline   : false
    required    : false
    type        : 'text'

  getInitialState: ->
    checked     : @props.value
    error       : @props.error
    touch       : @props.type in ['checkbox', 'radio']
    value       : @props.value
    focus       : false
    valid       : false

  # -- Events
  onBlur: (event) ->
    @setState focus: false
    @props.onBlur? event, @

  onChange: (event) ->
    if @state.touch
      @setState checked: event.target.checked, error: undefined
    else
      @setState value: event.target.value, error: undefined
    @props.onChange? event, @

  onFocus: (event) ->
    @setState focus: true
    @props.onFocus? event, @

  onKeyPress: (event) ->
    @setState focus: true
    @props.onKeyPress? event, @

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type
    className += ' checked'         if @state.checked
    className += ' disabled'        if @props.disabled
    className += ' error'           if @state.error
    className += ' focus'           if @state.focus
    className += ' hidden'          if @props.type is 'hidden'
    className += ' touch'           if @state.touch
    className += ' radio'           if @props.type is 'radio'
    className += ' valid'           if @state.value? and @state.value.length > 0

    <div data-react-toolbox='input' className={className}>
      {
        if @props.multiline
          <textarea ref='input' {...@props}
                    value={@state.value}
                    onChange={@onChange}
                    onKeyPress={@onKeyPress}
                    onFocus={@onFocus}
                    onBlur={@onBlur}
                    value={@state.value} />

        else if @props.type is 'file'
          delete @props.value
          <input ref="input" {...@props} onChange={@onChange} />

        else
          <input ref='input' {...@props}
                 value={@state.value}
                 checked={@state.checked} 
                 onBlur={@onBlur}
                 onChange={@onChange}
                 onFocus={@onFocus}
                 onKeyPress={@onKeyPress} />
      }
      <span className='bar'></span>
      { <label>{@props.label}</label> if @props.label }
      { <span className='error'>{@state.error}</span> if @state.error }
    </div>

  # -- Extends
  blur: ->
    @refs.input.getDOMNode().blur()

  focus: ->
    @refs.input.getDOMNode().focus()

  getValue: ->
    if @props.type is 'file'
      @state.value
    else
      @refs.input?.getDOMNode()[if @state.touch then 'checked' else 'value']

  setError: (data = 'Unknown error') ->
    @setState error: @props.error or data

  setValue: (data) ->
    data = false if @state.touch and data is undefined
    attributes = value: data
    attributes.checked = data if @state.touch and data?
    @setState attributes
