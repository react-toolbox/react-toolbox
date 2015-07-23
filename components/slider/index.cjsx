React        = require 'react/addons'
prefixer     = require "../prefixer"
localCSS     = require './style'

ProgressBar  = require "../progress_bar"
Input        = require "../input"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className    : React.PropTypes.string
    editable     : React.PropTypes.bool
    max          : React.PropTypes.number
    min          : React.PropTypes.number
    onChange     : React.PropTypes.func
    pinned       : React.PropTypes.bool
    snaps        : React.PropTypes.bool
    step         : React.PropTypes.number
    value        : React.PropTypes.number

  getDefaultProps: ->
    className    : ""
    editable     : false
    max          : 100
    min          : 0
    pinned       : false
    snaps        : false
    step         : 0.01
    value        : 0

  getInitialState: ->
    sliderStart  : 0
    sliderLength : 0
    value        : @props.value

  # -- Lifecycle
  componentDidMount: ->
    @onResize()
    window.addEventListener('resize', @onResize)

  componentWillUnmount: ->
    window.removeEventListener('resize', @onResize)

  componentDidUpdate: (prevProps, prevState) ->
    if prevState.value != @state.value
      @props.onChange? @
      if @state.value != parseFloat(@refs.input?.getValue())
        @refs.input?.setValue(@valueForInput(@state.value))

  # -- Events
  onResize: (event) ->
    sliderBounds = @refs.progressbar.getDOMNode().getBoundingClientRect()
    @setState
      sliderStart:  sliderBounds['left'],
      sliderLength: (sliderBounds['right'] - sliderBounds['left'])

  onSliderMouseDown: (event) ->
    position  = _getMousePosition(event)
    value = @positionToValue(position)
    @setState value: value, =>
      @start(position)
      _addEventsToDocument(@getMouseEventMap())
    _pauseEvent(event)

  onSliderTouchStart: (event) ->
    position  = _getTouchPosition(event)
    value = @positionToValue(position)
    @setState value: value, =>
      @start(position)
      _addEventsToDocument(@getTouchEventMap())
    _pauseEvent(e)

  onSliderFocus: (event) ->
    _addEventsToDocument(@getKeyboardEvents())

  onSliderBlur: (event) ->
    _removeEventsFromDocument(@getKeyboardEvents())

  onInputChange: ->
    @setState value: @trimValue(@refs.input.getValue())

  onKeyDown: (event) ->
    event.stopPropagation()
    @refs.slider.getDOMNode().blur() if event.keyCode in [13, 27]
    @addToValue(@props.step)         if event.keyCode == 38
    @addToValue(-@props.step)        if event.keyCode == 40

  onMouseDown: (event) ->
    @start(_getMousePosition(event))
    _addEventsToDocument(@getMouseEventMap())

  onTouchStart: (event) ->
    event.stopPropagation()
    @start(_getTouchPosition(event))
    _addEventsToDocument(@getTouchEventMap())

  onMouseMove: (event) ->
    _pauseEvent(event)
    @move(_getMousePosition(event))

  onTouchMove: (event) ->
    @move(_getTouchPosition(event))

  onMouseUp: ->
    @end(@getMouseEventMap())

  onTouchEnd: ->
    @end(@getTouchEventMap())

  # -- Internal methods
  getMouseEventMap: ->
    mousemove: @onMouseMove
    mouseup:   @onMouseUp

  getTouchEventMap: ->
    touchmove: @onTouchMove
    touchend:  @onTouchEnd

  getKeyboardEvents: ->
    keydown: @onKeyDown

  positionToValue: (position) ->
    offset = position.x - @state.sliderStart
    @trimValue(offset / @state.sliderLength * (@props.max - @props.min))

  start: (position) ->
    @setState
      pressed:       true
      startPosition: position.x
      startValue:    @state.value

  move: (position) ->
    value = @endPositionToValue(position)
    @setState value: value

  end: (events) ->
    _removeEventsFromDocument(events)
    @setState pressed: false

  endPositionToValue: (position) ->
    offset    = position.x - @state.startPosition
    diffValue = offset / @state.sliderLength * (@props.max - @props.min)
    @trimValue(diffValue + @state.startValue)

  trimValue: (value) ->
    value = @props.min if (value < @props.min)
    value = @props.max if (value > @props.max)
    @nearest(value)

  nearest: (value) ->
    steps  = (@props.max - @props.min) / @props.step
    zerone = Math.round((value - @props.min) * steps / (@props.max - @props.min))/steps
    return zerone * (@props.max - @props.min) + @props.min

  addToValue: (value) ->
    @setState value: @trimValue(@state.value + value)

  valueForInput: (value) ->
    decimals = (@props.step.toString().split('.')[1] || []).length
    if decimals > 0 then value.toFixed(decimals) else value.toString()

  calculateKnobOffset: ->
    @state.sliderLength * (@state.value - @props.min) / (@props.max - @props.min)

  render: ->
    className  = @props.className
    className += " editable" if @props.editable
    className += " pinned"   if @props.pinned
    className += " pressed"  if @state.pressed
    className += " ring"     if @state.value == @props.min
    knobStyles = prefixer.transform("translateX(#{@calculateKnobOffset()}px)")

    <div className={localCSS.root + className}
         tabIndex="0"
         onFocus={@onSliderFocus}
         onBlur={@onSliderBlur} >

      <div ref="slider"
           className={localCSS.container}
           onTouchStart={@onSliderTouchStart}
           onMouseDown={@onSliderMouseDown} >

        <div ref="knob" className={localCSS.knob} style={knobStyles}
             onMouseDown={@onMouseDown}
             onTouchStart={@onTouchStart} >
          <div className={localCSS.knobInner} data-value={parseInt(@state.value)}></div>
        </div>

        <div className={localCSS.progress} >
          <ProgressBar ref="progressbar" mode="determinate"
                       className={localCSS.progressInner}
                       value={@state.value}
                       max={@props.max}
                       min={@props.min}/>
          {
            if @props.snaps
              <div className={localCSS.snaps}>
              {
                for i in [1..((@props.max - @props.min) / @props.step)]
                  <div key="span-#{i}" className={localCSS.snap}></div>
              }
              </div>
          }
        </div>
      </div>

      {
        if @props.editable
          <Input ref="input" className={localCSS.input}
                 onChange={@onInputChange}
                 value={@valueForInput(@state.value)} />
      }
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (value) ->
    @setState value: value

# -- Private methods
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

_addEventsToDocument = (events) ->
  document.addEventListener(key, events[key], false) for key of events

_removeEventsFromDocument = (events) ->
  document.removeEventListener(key, events[key], false) for key of events
