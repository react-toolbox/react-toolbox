###
v2
  - can set a icon like dispatcher
  - can set different template (maybe use a kind of mixin )
###

require './style'
Navigation  = require "../navigation"
Ripple      = require "../ripple"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    color       : React.PropTypes.string
    image       : React.PropTypes.string
    legend      : React.PropTypes.string
    info        : React.PropTypes.string
    onClick     : React.PropTypes.func
    type        : React.PropTypes.string

  getDefaultProps: ->
    className   : ""
    type        : "default"

  getInitialState: ->
    loading     : @props.loading
    ripple      : undefined

  # -- Lifecycle
  componentWillReceiveProps: ->
    @setState ripple: undefined

  # -- Events
  onClick: ->
    event.preventDefault()
    client = event.target.getBoundingClientRect?()
    @setState ripple:
                left  : event.pageX - client?.left
                top   : event.pageY - client?.top
                width : (client?.width * 2.5)
    @props.onClick? event, @

  # -- Render
  render: ->
    className = @props.className
    className += " touch" if @props.onClick?
    className += " image" if @props.image?
    className += " color" if @props.color?
    style = {}
    style.backgroundImage = "url(#{@props.image})" if @props.image
    style.backgroundColor = @props.color if @props.color

    <div data-component-card={@props.type} className={className}
         onClick={@onClick if @props.onClick}>
      {
        if @props.title or image
          <figure style={style}>
            { <h2>{@props.title}</h2> if @props.title }
          </figure>
      }
      { <p>{@props.text}</p> if @props.text }
      { <small>{@props.legend}</small> if @props.legend }
      { <Navigation actions={@props.actions} /> if @props.actions }
      { <Ripple origin={@state.ripple} loading={@state.loading} /> if @props.onClick }
    </div>
