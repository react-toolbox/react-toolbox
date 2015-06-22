###
@todo
###

require './style'
FontIcon = require "../font_icon"
Ripple   = require "../ripple"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    caption     : React.PropTypes.string
    icon        : React.PropTypes.string
    style       : React.PropTypes.string
    disabled    : React.PropTypes.bool
    loading     : React.PropTypes.bool

  getDefaultProps: ->
    type        : "square"
    disabled    : false
    loading     : false

  getInitialState: ->
    ripple      : undefined

  # -- Lifecycle
  componentWillReceiveProps: ->
    @setState ripple: undefined

  # -- Events
  onClick: (event) ->
    event.preventDefault()
    client = event.target.getBoundingClientRect?()
    @setState ripple:
                left  : event.pageX - client?.left
                top   : event.pageY - client?.top
                width : (client?.width * 2.5)
    @props.onClick? event, @

  # -- Render
  render: ->
    <button data-component-button={@props.type}
            onClick={@onClick}
            className={@props.style}
            disabled={@props.disabled or @props.loading}
            data-flex="horizontal center">
      { <FontIcon value={@props.icon} /> if @props.icon }
      { <abbr>{@props.caption}</abbr> if @props.caption }
      <Ripple origin={@state.ripple} loading={@props.loading} />
    </button>
