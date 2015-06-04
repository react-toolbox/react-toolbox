###
@todo
###

FontIcon = require "./font_icon"
Ripple   = require "./ripple"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    caption     : React.PropTypes.string
    icon        : React.PropTypes.string
    style       : React.PropTypes.string
    disabled    : React.PropTypes.bool

  getDefaultProps: ->
    type        : "square"
    disabled    : false

  getInitialState: ->
    ripple      : undefined

  # -- Events
  onClick: (event) ->
    event.preventDefault()
    @setState ripple:
                left  : event.pageX - event.target.offsetLeft
                top   : event.pageY - event.target.offsetTop
    @props.onClick? event, @

  # -- Render
  render: ->
    <button data-component-button={@props.type}
            onClick={@onClick}
            className={@props.style}
            disabled={@props.disabled}
            data-flex="horizontal center">
      { <FontIcon value={@props.icon} /> if @props.icon }
      { <abbr>{@props.caption}</abbr> if @props.caption }
      <Ripple origin={@state.ripple} />
    </button>
