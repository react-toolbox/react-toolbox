Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    format       : React.PropTypes.oneOf(['24hr', 'ampm'])
    onChange     : React.PropTypes.func
    onHandMoved  : React.PropTypes.func
    selected     : React.PropTypes.number

  getInitialState: ->
    innerNumber  : @props.format == '24hr' && 0 < @props.selected <= 12

  # -- Events
  _onHandMouseMove: (radius) ->
    if @props.format == '24hr'
      currentInner = radius < @props.radius - @props.spacing * 2
      @setState innerNumber: currentInner if @state.innerNumber != currentInner

  _onHandChange: (degrees) ->
    @props.onChange(@_valueFromDegrees(degrees))

  _onMouseDown: (event)->
    @refs.hand.mouseStart(event)

  # -- Internal Methods
  _valueFromDegrees: (degrees) ->
    if @props.format == 'ampm' || @props.format == '24hr' && @state.innerNumber
      parseInt(INNER_NUMBERS[degrees/STEP])
    else
      parseInt(OUTER_NUMBERS[degrees/STEP])

  # -- Render
  render: ->
    innerRadius = @props.radius - @props.spacing * 2
    handRadius  = if @state.innerNumber then innerRadius else @props.radius
    handLength  = handRadius - @props.spacing

    <div>
        <Face
          onMouseDown={@_onMouseDown}
          numbers={if @props.format == '24hr' then OUTER_NUMBERS else INNER_NUMBERS}
          spacing={@props.spacing}
          radius={@props.radius}
          activeNumber={@props.selected} />
        {
          if @props.format == '24hr'
            <Face
              onMouseDown={@_onMouseDown}
              numbers={INNER_NUMBERS}
              spacing={@props.spacing}
              radius={innerRadius}
              activeNumber={@props.selected} />
        }
        <Hand ref='hand'
          degrees={@state.degrees}
          initialAngle={@props.selected * STEP}
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
