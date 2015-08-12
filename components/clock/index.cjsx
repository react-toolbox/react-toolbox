css = require './style'

module.exports = React.createClass

  getInitialState: ->
    angle: 0
    pressed: false

  # -- Lifecycle
  componentDidMount: ->
    clockBounds = @refs.clock.getDOMNode().getBoundingClientRect()
    @setState
      center:    @_getClockCenter()
      minRadius: @_getMinRadius()
      maxRadius: @_getMaxRadius()

  onKnobMouseDown: ->
    @setState pressed: true
    _addEventsToDocument(@getMouseEventMap())

  getMouseEventMap: ->
    mousemove: @onMouseMove
    mouseup:   @onMouseUp

  onMouseMove: (event) ->
    radius = @_getClickRadius(event)
    if (@state.minRadius < radius < @state.maxRadius)
      @setState angle: @_trimValue(@_getAngleFromClickEvent(event))

  onMouseUp: ->
    @setState pressed: false
    @end(@getMouseEventMap())

  end: (events) ->
    _removeEventsFromDocument(events)

  _getClockCenter: ->
    bounds = @refs.clock.getDOMNode().getBoundingClientRect()
    return {
      x: bounds.left + (bounds.right  - bounds.left)/2
      y: bounds.top  + (bounds.bottom - bounds.top) /2
    }

  _getMinRadius: ->
    bounds = @refs.clockInner.getDOMNode().getBoundingClientRect()
    (bounds.right  - bounds.left)/2

  _getMaxRadius: ->
    bounds = @refs.root.getDOMNode().getBoundingClientRect()
    (bounds.right  - bounds.left)/2

  _getAngleFromClickEvent: (event) ->
    mouse = _getMousePosition(event)
    _angle360(@state.center.x, @state.center.y, mouse.x, mouse.y)

  onClockClick: (event) ->
    radius = @_getClickRadius(event)
    if (@state.minRadius < radius < @state.maxRadius)
      @setState angle: @_trimValue(@_getAngleFromClickEvent(event))

  _trimValue: (angle) ->
    step = 360/12
    step * Math.round(angle/step)

  _getClickRadius: (event) ->
    mouse = _getMousePosition(event)
    x = @state.center.x - mouse.x
    y = @state.center.y - mouse.y
    r = Math.sqrt(x * x + y * y)
    return r

  render: ->
    className  = ''
    className += ' pressed' if @state.pressed
    handStyle =
      transform: "rotate(#{@state.angle}deg)"

    <div ref="root" className={css.root + '' + className} onClick={@onClockClick}>
      <div ref="clock" className={css.clock}>
          <div ref="hand" style={handStyle} className={css.hand}>
            <div className={css.knob} onMouseDown={@onKnobMouseDown}></div>
          </div>
          <div className={css.hours}>
            { <span className={css.hour} key="hour-#{i}">{i}</span> for i in [1..12] }
          </div>
      </div>
      <div ref="clockInner" className={css.clockInner} onClick={_pauseEvent}></div>
    </div>

_pauseEvent = (event) ->
  event.stopPropagation()
  event.preventDefault()
  event.returnValue = false
  event.cancelBubble = true
  return null

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
