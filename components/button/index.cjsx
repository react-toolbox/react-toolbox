localCSS = require './style'
FontIcon = require '../font_icon'
Ripple   = require '../ripple'

module.exports = React.createClass
  displayName   : 'Button'

  # -- States & Properties
  propTypes:
    caption     : React.PropTypes.string
    className   : React.PropTypes.string
    disabled    : React.PropTypes.bool
    icon        : React.PropTypes.string
    loading     : React.PropTypes.bool
    type        : React.PropTypes.string

  getDefaultProps: ->
    className   : ''
    type        : 'raised'

  getInitialState: ->
    loading     : @props.loading
    focused     : false
    ripple      : undefined

  # -- Lifecycle
  componentWillReceiveProps: ->
    @setState ripple: undefined

  # -- Events
  onClick: (event) ->
    event.preventDefault()
    client = event.target.getBoundingClientRect?()
    @setState
      focused: true
      ripple:
        left  : event.pageX - client?.left
        top   : event.pageY - client?.top
        width : (client?.width * 2.5)
    @props.onClick? event, @
    setTimeout (=> @setState focused: false), 450

  # -- Render
  render: ->
    className  = @props.className
    className += " #{@props.type}" if @props.type
    className += ' focused'        if @state.focused

    <button data-react-toolbox='button'
            onClick={@onClick}
            className={localCSS.root + ' ' + className}
            disabled={@props.disabled or @state.loading}
            data-flex='horizontal center'>
      { <FontIcon value={@props.icon} /> if @props.icon }
      { <abbr>{@props.caption}</abbr> if @props.caption }
      <Ripple origin={@state.ripple} loading={@state.loading} />
    </button>

  # -- Extends
  loading: (value) ->
    @setState loading: value
