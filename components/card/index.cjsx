localCSS    = require './style'
Navigation  = require '../navigation'
Ripple      = require '../ripple'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    color       : React.PropTypes.string
    image       : React.PropTypes.string
    text        : React.PropTypes.string
    legend      : React.PropTypes.string
    loading     : React.PropTypes.bool
    onClick     : React.PropTypes.func
    title       : React.PropTypes.string
    type        : React.PropTypes.string

  getDefaultProps: ->
    className   : ''
    type        : 'default'

  getInitialState: ->
    loading     : @props.loading
    ripple      : undefined

  # -- Lifecycle
  componentWillReceiveProps: ->
    @setState ripple: undefined

  # -- Events
  onClick: (event) ->
    event.preventDefault() if @props.onClick?
    client = event.target.getBoundingClientRect?()
    @setState ripple:
                left  : event.pageX - client?.left
                top   : event.pageY - client?.top
                width : (client?.width * 2.5)
    @props.onClick? event, @

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type
    className += ' touch' if @props.onClick?
    className += ' image' if @props.image?
    className += ' color' if @props.color?
    className += ' loading' if @state.loading?
    style = {}
    style.backgroundImage = "url(#{@props.image})" if @props.image?
    style.backgroundColor = @props.color if @props.color

    <div data-react-toolbox='card' className={className} onClick={@onClick}>
      {
        if @props.title or @props.image
          <figure className={localCSS.figure} style={style}>
            { <small>{@props.subtitle}</small> if @props.subtitle }
            { <h2>{@props.title}</h2> if @props.title }
          </figure>
      }
      { <p>{@props.text}</p> if @props.text }
      { <small>{@props.legend}</small> if @props.legend }
      { <Navigation className={localCSS.navigation} actions={@props.actions} /> if @props.actions }
      { <Ripple className={localCSS.ripple} origin={@state.ripple} loading={@state.loading} /> }
    </div>

  # -- Extends
  loading: (value) ->
    @setState loading: value
