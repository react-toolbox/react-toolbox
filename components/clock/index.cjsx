css     = require './style'
Hours   = require './hours'
Minutes = require './minutes'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    display   : React.PropTypes.oneOf(['hours', 'minutes'])
    format    : React.PropTypes.oneOf(['24hr', 'ampm'])

  getDefaultProps: ->
    className : ''
    display   : 'hours'
    format    : '24hr'

  getInitialState: ->
    radius    : 0

  # -- Lifecycle
  componentDidMount: ->
    window.addEventListener('resize', @handleResize)
    @setState radius: @_getRadius()

  componentWillUpdate: ->
    center = @_getCenter()
    @setState center: center if @state.center?.x != center.x && @state.center?.y != center.y

  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize)

  # -- Events handlers
  onHourChange: (hour) ->
    console.log "Hour changed to #{hour}"

  onMinuteChange: (minute) ->
    console.log "Minute changed to #{minute}"

  # -- Helper methods
  _getRadius: ->
    @refs.wrapper.getDOMNode().getBoundingClientRect().width/2

  handleResize: ->
    @setState
      center: @_getCenter()
      radius: @_getRadius()

  _getCenter: ->
    bounds = @getDOMNode().getBoundingClientRect()
    {
      x: bounds.left + (bounds.right  - bounds.left)/2
      y: bounds.top  + (bounds.bottom - bounds.top) /2
    }

  # -- Render
  render: ->
    <div className={css.root}>
      <div ref="wrapper" className={css.wrapper} style={height: @state.radius * 2} >
        {
          if @props.display == 'minutes'
            <Minutes
              center={@state.center}
              onChange={@onMinuteChange}
              radius={@state.radius}
              spacing={@state.radius * 0.16} />
          else if @props.display == 'hours'
            <Hours
              center={@state.center}
              format={@props.format}
              onChange={@onHourChange}
              radius={@state.radius}
              spacing={@state.radius * 0.16} />
        }
      </div>
    </div>
