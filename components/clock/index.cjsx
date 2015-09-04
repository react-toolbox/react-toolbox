css       = require './style'
dateUtils = require '../date_utils'
Hours     = require './hours'
Minutes   = require './minutes'

module.exports = React.createClass
  displayName   : 'Clock'

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    display     : React.PropTypes.oneOf(['hours', 'minutes'])
    format      : React.PropTypes.oneOf(['24hr', 'ampm'])
    initialTime : React.PropTypes.object
    onChange    : React.PropTypes.func

  getDefaultProps: ->
    className   : ''
    display     : 'hours'
    format      : '24hr'
    initialTime : new Date()

  getInitialState: ->
    radius      : 0
    time        : @props.initialTime

  # -- Lifecycle
  componentDidMount: ->
    window.addEventListener('resize', @handleResize)
    @setState radius: @_getRadius()

  componentWillUpdate: (props, state) ->
    center = @_getCenter()
    if state.time.getTime() != @state.time.getTime() && @props.onChange
      @props.onChange(state.time)
    if @state.center?.x != center.x && @state.center?.y != center.y
      @setState center: center

  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize)

  # -- Events handlers
  onHourChange: (hours) ->
    @setState time: dateUtils.setHours(@state.time, @_adaptHourToFormat(hours))

  onMinuteChange: (minutes) ->
    @setState time: dateUtils.setMinutes(@state.time, minutes)

  # -- Helper methods
  _getRadius: ->
    @refs.wrapper.getDOMNode().getBoundingClientRect().width/2

  _adaptHourToFormat: (hour) ->
    if @props.format == 'ampm'
      if dateUtils.timeMode(@state.time) == 'pm'
        if hour < 12 then hour + 12 else hour
      else
        if hour == 12 then 0 else hour
    else
      hour

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

  # -- Public methods
  toggleTimeMode: ->
    @setState time: dateUtils.toggleTimeMode(@state.time)

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
              selected={@state.time.getMinutes()}
              spacing={@state.radius * 0.16} />
          else if @props.display == 'hours'
            <Hours
              center={@state.center}
              format={@props.format}
              onChange={@onHourChange}
              radius={@state.radius}
              selected={@state.time.getHours()}
              spacing={@state.radius * 0.16} />
        }
      </div>
    </div>
