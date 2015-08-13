css = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className              : React.PropTypes.string

  getDefaultProps: ->
    className              : ''

  getInitialState: ->
    clockCenter            : undefined
    clockCenter            : undefined
    clockInnerMaxRadius    : undefined
    clockInnerMinRadius    : undefined
    clockMaxRadius         : undefined
    clockMinRadius         : undefined
    handInner              : false
    pressed                : false
    handAngle              : 0

  # -- Lifecycle
  componentDidMount: ->
    @setState
      clockCenter          : @_getClockCenter()
      clockMaxRadius       : @_getRefRadius('root')
      clockMinRadius       : @_getRefRadius('clockHolder')
      clockInnerMaxRadius  : @_getRefRadius('clockHolder')
      clockInnerMinRadius  : @_getRefRadius('innerClockHolder')

  # -- Position Functions
  _getClockCenter: ->
    bounds = @refs.root.getDOMNode().getBoundingClientRect()
    return {
      x: bounds.left + (bounds.right  - bounds.left)/2
      y: bounds.top  + (bounds.bottom - bounds.top) /2
    }

  _getRefRadius: (ref) ->
    bounds = @refs[ref].getDOMNode().getBoundingClientRect()
    (bounds.right  - bounds.left)/2

  _isInsideClockArea: (position) ->
    @state.clockMinRadius < @_getPositionRadius(position) < @state.clockMaxRadius

  _isInsideClockInnerArea: (position) ->
    @state.clockInnerMinRadius < @_getPositionRadius(position) < @state.clockInnerMaxRadius

  _getPositionRadius: (position) ->
    x = @state.clockCenter.x - position.x
    y = @state.clockCenter.y - position.y
    Math.sqrt(x * x + y * y)

  # -- Helper Functions
  _positionToAngle: (position) ->
    _angle360(@state.clockCenter.x, @state.clockCenter.y, position.x, position.y)

  _trimAngleToValue: (angle) ->
    step = 360/12
    step * Math.round(angle/step)

  _getMouseEventMap: ->
    mousemove: @onMouseMove
    mouseup:   @onMouseUp

  _moveHandToPosition: (position) ->
    trimAngle = @_trimAngleToValue(@_positionToAngle(position))
    if @_isInsideClockInnerArea(position)
      @setState
        handAngle: trimAngle
        handInner: true
    else if @_isInsideClockArea(position)
      @setState
        handAngle: trimAngle
        handInner: false

  _end: (events) ->
    _removeEventsFromDocument(events)

  # -- Event handlers
  onClockMouseDown: (event) ->
    position  = _getMousePosition(event)
    @_moveHandToPosition(position)
    _addEventsToDocument(@_getMouseEventMap())
    @setState pressed: true

  onKnobMouseDown: (event) ->
    _addEventsToDocument(@_getMouseEventMap())
    @setState pressed: true

  onMouseMove: (event) ->
    position  = _getMousePosition(event)
    @_moveHandToPosition(position)

  onMouseUp: ->
    @_end(@_getMouseEventMap())
    @setState pressed: false

  render: ->
    className  = @props.className
    className += css.root
    className += " hand-inner" if @state.handInner
    className += " pressed"    if @state.pressed
    handStyle  = transform: "rotate(#{@state.handAngle}deg)"

    <div ref="root" className={className} onMouseDown={@onClockMouseDown}>
      {# Main Clock }
      <div ref="clock" className={css.clock}>
        { <span className={css.hour} key="hour-#{i}">{i}</span> for i in [13..23] }
          <span className={css.hour} key="hour-00">00</span>
      </div>

      {# Inner Clock }
      <div ref="innerClock" className={css.innerClock}>
        { <span className={css.innerHour} key="hour-#{i}">{i}</span> for i in [1..12] }
      </div>

      {# Support area holders }
      <div ref="clockHolder" className={css.clockHolder}></div>
      <div ref="innerClockHolder" className={css.innerClockHolder}></div>

      {# Clock hand }
      <div ref="hand" style={handStyle} className={css.hand}>
        <div className={css.knob} onMouseDown={@onKnobMouseDown}></div>
      </div>
    </div>

_getMousePosition = (event) ->
  x: event.pageX
  y: event.pageY

_angle = (cx, cy, ex, ey) ->
  dy = ey - cy;
  dx = ex - cx;
  theta = Math.atan2(dy, dx) + Math.PI/2
  theta = theta * 180 / Math.PI
  return theta

_angle360 = (cx, cy, ex, ey) ->
  theta = _angle(cx, cy, ex, ey)
  theta = 360 + theta if (theta < 0)
  return theta

_addEventsToDocument = (events) ->
  document.addEventListener(key, events[key], false) for key of events

_removeEventsFromDocument = (events) ->
  document.removeEventListener(key, events[key], false) for key of events
