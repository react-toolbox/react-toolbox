Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    initialValue : React.PropTypes.number
    format       : React.PropTypes.oneOf(['24hr', 'ampm'])
    onChange     : React.PropTypes.func
    onHandMoved  : React.PropTypes.func

  getDefaultProps: ->
    initialValue : null
    format       : '24hr'
    onChange     : null

  getInitialState: ->
    inner        : @props.format == '24hr' && 0 < @props.initialValue <= 12
    value        : @props.initialValue || if @props.format == '24hr' then 0 else 12

  # -- Lifecycle
  componentWillUpdate: (nextProps, nextState) ->
    @props.onChange(nextState.value) if nextState.value != @state.value && @props.onChange

  # -- Events
  _onHandMouseMove: (radius) ->
    if @props.format == '24hr'
      currentInner = radius < @props.radius - @props.spacing * 2
      @setState inner: currentInner if @state.inner != currentInner

  _onHandChange: (degrees) ->
    newValue = @_valueFromDegrees(degrees)
    @setState value: newValue if @state.value != newValue

  # -- Internal Methods
  _valueFromDegrees: (degrees) ->
    if @props.format == 'ampm' || @props.format == '24hr' && @state.inner
      parseInt(INNER_NUMBERS[degrees/STEP])
    else
      parseInt(OUTER_NUMBERS[degrees/STEP])

  # -- Render
  render: ->
    innerRadius = @props.radius - @props.spacing * 2
    handRadius  = if @state.inner then innerRadius else @props.radius
    handLength  = handRadius - @props.spacing

    <div>
        <Face
          numbers={if @props.format == '24hr' then OUTER_NUMBERS else INNER_NUMBERS}
          spacing={@props.spacing}
          radius={@props.radius}
          activeNumber={@state.value} />
        {
          if @props.format == '24hr'
            <Face
              numbers={INNER_NUMBERS}
              spacing={@props.spacing}
              radius={innerRadius}
              activeNumber={@state.value} />
        }
        <Hand
          degrees={@state.degrees}
          initialAngle={@props.initialValue * STEP}
          length={handLength}
          onHandMouseMove={@_onHandMouseMove}
          onHandMoved={@props.onHandMoved}
          onHandChange={@_onHandChange}
          origin={@props.center}
          step={STEP} />
    </div>

# -- Private constants
INNER_NUMBERS = [12].concat([1..11])
OUTER_NUMBERS = ['00'].concat([13..23])
STEP          = 360/12
