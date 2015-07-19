style       = require './style'
ProgressBar = require "../progress_bar"
Input       = require "../input"
prefixer    = require "../prefixer"

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
      @refs.input.setValue(@valueForInput(@state.value)) if @refs.input?

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

  onInputBlur: ->
    @setState value: @trimValue(@refs.input.getValue())

  onKeyDown: (event) ->
    event.stopPropagation()
    @refs.slider.getDOMNode().blur() if event.keyCode in [13, 27]
    @addToValue(@props.step)         if event.keyCode in [38, 39]
    @addToValue(-@props.step)        if event.keyCode in [37, 40]

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

  # Given a position, this method calculates the distance to the slider start
  # and with that offset calculates the corresponding value
  positionToValue: (position) ->
    offset = position.x - @state.sliderStart
    @trimValue(offset / @state.sliderLength * (@props.max - @props.min))

  # Called when a drag is started and used to store the initial position
  # and value in the state so when finished it can be used to get a diff
  start: (position) ->
    @setState
      pressed:       true
      startPosition: position.x
      startValue:    @state.value

  # Called to move the knap and used from the touch move and mouse move
  # events. Receives the position to move to
  move: (position) ->
    value = @endPositionToValue(position)
    @setState value: value

  # This method is called when a movement was finished
  end: (events) ->
    _removeEventsFromDocument(events)
    @setState pressed: false

  # Given a position, this method calculates the distance to the start
  # position stored in the state and gets the corresponding value that is
  # added to the initial value
  endPositionToValue: (position) ->
    offset    = position.x - @state.startPosition
    diffValue = offset / @state.sliderLength * (@props.max - @props.min)
    @trimValue(diffValue + @state.startValue)

  # Leaves a given value between the minimun and maximum set in the
  # component props
  trimValue: (value) ->
    value = @props.min if (value < @props.min)
    value = @props.max if (value > @props.max)
    @nearest(value)

  # Rounds a given value to the next valid step in the scale defined for the range
  nearest: (value) ->
    steps  = (@props.max - @props.min) / @props.step
    zerone = Math.round((value - @props.min) * steps / (@props.max - @props.min))/steps
    return zerone * (@props.max - @props.min) + @props.min

  # Adds a given value to the current value
  addToValue: (value) ->
    @setState value: @trimValue(@state.value + value)

  valueForInput: (value) ->
    decimals = (@props.step.toString().split('.')[1] || []).length
    if decimals > 0 then value.toFixed(decimals) else value.toString()

  # Reads the value from the state and depending on min and max properties
  # returns the corresponding offset to the slider start
  calcOffset: ->
    @state.sliderLength * (@state.value - @props.min) / (@props.max - @props.min)

  render: ->
    knobStyles = prefixer.transform("translateX(#{@calcOffset()}px)")
    className  = "#{@props.className} #{style.slider}"
    className += " editable" if @props.editable
    className += " pinned"   if @props.pinned
    className += " pressed"  if @state.pressed
    className += " ring"     if @state.value == @props.min

    <div data-component-slider
         className={className}
         tabIndex="0"
         ref="slider"
         onFocus={@onSliderFocus}
         onBlur={@onSliderBlur} >

      <div data-component-slider-container
           className={style.container}
           onTouchStart={@onSliderTouchStart}
           onMouseDown={@onSliderMouseDown} >

        <div data-component-slider-knob
             className={style.knob}
             style={knobStyles}
             onMouseDown={@onMouseDown}
             onTouchStart={@onTouchStart} >

          <div data-component-slider-knob-inner
               className={style.knobInner}
               data-value={parseInt(@state.value)}></div>
        </div>

        <div data-component-slider-progressbar>
          <ProgressBar className="slider-progressbar-inner"
                       ref="progressbar"
                       mode="determinate"
                       value={@state.value}
                       max={@props.max}
                       min={@props.min}/>
          {
            if @props.snaps
              <div className={style.snaps}>
              {
                for i in [1..((@props.max - @props.min) / @props.step)]
                  <div key="span-#{i}" className={style.snap}></div>
              }
              </div>
          }
        </div>
      </div>

      { <Input className={style.input} ref="input" onBlur={@onInputBlur}
               value={@valueForInput(@state.value)} /> if @props.editable }
    </div>

  # -- Extends
  getValue: ->
    @state.value

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
