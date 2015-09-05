css      = require './style'
prefixer = require '../utils/prefixer'

module.exports = React.createClass
  displayName    : 'Hand'

  # -- States & Properties
  propTypes:
    className    : React.PropTypes.string
    initialAngle : React.PropTypes.number
    onHandChange : React.PropTypes.func
    onHandMoved  : React.PropTypes.func

  getDefaultProps: ->
    className    : ''
    initialAngle : 0
    length       : 0
    origin       : {}

  getInitialState: ->
    angle        : @props.initialAngle
    knobWidth    : 0
    radius       : 0

  # -- Lifecycle
  componentDidMount: ->
    @setState knobWidth: @refs.knob.getDOMNode().offsetWidth

  componentWillUpdate: (nextProps, nextState) ->
    if nextState.angle  != @state.angle  ||
       nextProps.length != @props.length &&
       @props.length != 0
      @props.onHandChange(nextState.angle)

  # -- Event handlers
  _getMouseEventMap: ->
    mousemove : @onMouseMove
    mouseup   : @onMouseUp

  _getTouchEventMap: ->
    touchmove: @onTouchMove
    touchend:  @onTouchEnd

  onMouseMove: (event) ->
    @_move(_getMousePosition(event))

  onTouchMove: (event) ->
    @_move(_getTouchPosition(event))

  onMouseUp: ->
    @_end(@_getMouseEventMap())

  onTouchEnd: ->
    @_end(@_getTouchEventMap())

  # -- Public API
  mouseStart: (event) ->
    _addEventsToDocument(@_getMouseEventMap())
    @_move(_getMousePosition(event))

  touchStart: (event) ->
    _addEventsToDocument(@_getTouchEventMap())
    @_move(_getTouchPosition(event))
    _pauseEvent(event)

  # -- Internal methods
  _move: (position) ->
    @props.onHandMouseMove(@_getPositionRadius(position)) if @props.onHandMouseMove
    newDegrees = @_trimAngleToValue(@_positionToAngle(position))
    newDegrees = if newDegrees == 360 then 0 else newDegrees
    @setState(angle: newDegrees) if @state.angle != newDegrees

  _getPositionRadius: (position) ->
    x = @props.origin.x - position.x
    y = @props.origin.y - position.y
    Math.sqrt(x * x + y * y)

  _trimAngleToValue: (angle) ->
    @props.step * Math.round(angle/@props.step)

  _positionToAngle: (position) ->
    _angle360(@props.origin.x, @props.origin.y, position.x, position.y)

  _end: (events) ->
    @props.onHandMoved() if @props.onHandMoved
    _removeEventsFromDocument(events)

  # -- Render
  render: ->
    style = prefixer(transform: "rotate(#{@state.angle}deg)")
    style.height = @props.length - @state.knobWidth/2

    <div className={css.hand + ' ' + @props.className} style={style}>
      <div ref='knob' className={css.knob}></div>
    </div>

# -- Static Helper functions
_addEventsToDocument = (events) ->
  document.addEventListener(key, events[key], false) for key of events

_removeEventsFromDocument = (events) ->
  document.removeEventListener(key, events[key], false) for key of events

_pauseEvent = (event) ->
  event.stopPropagation()
  event.preventDefault()
  event.returnValue = false
  event.cancelBubble = true
  return null

_getMousePosition = (event) ->
  x: event.pageX
  y: event.pageY

_getTouchPosition = (event) ->
  x: event.touches[0]['pageX']
  y: event.touches[0]['pageY']

_angle360 = (cx, cy, ex, ey) ->
  theta = _angle(cx, cy, ex, ey)
  if (theta < 0) then 360 + theta else theta

_angle = (cx, cy, ex, ey) ->
  theta = Math.atan2(ey - cy, ex - cx) + Math.PI/2
  theta * 180 / Math.PI
