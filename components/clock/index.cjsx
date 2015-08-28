css     = require './style'
Hours   = require './hours'
Minutes = require './minutes'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    startMode : React.PropTypes.oneOf(['hours', 'minutes'])

  getDefaultProps: ->
    className : ''
    startMode : 'hours'

  getInitialState: ->
    mode      : @props.startMode
    radius    : 0

  # -- Lifecycle
  componentDidMount: ->
    window.addEventListener('resize', @handleResize)
    @setState radius: @_getRadius()

  componentWillUpdate: ->
    center = @_getCenter()
    if @state.center?.x != center.x && @state.center?.y != center.y
      @setState center: center

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
          if @state.mode == 'minutes'
            <Minutes
              center={@state.center}
              onChange={@onMinuteChange}
              radius={@state.radius}
              spacing={@state.radius * 0.16} />
          else if @state.mode == 'hours'
            <Hours
              format={'24hr'}
              initialValue={16}
              center={@state.center}
              onChange={@onHourChange}
              radius={@state.radius}
              spacing={@state.radius * 0.16} />
        }
      </div>
    </div>
