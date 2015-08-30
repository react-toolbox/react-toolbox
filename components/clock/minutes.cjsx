Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    selected : React.PropTypes.number
    onChange : React.PropTypes.func

  getDefaultProps: ->
    selected : 0
    onChange : null

  # -- Events
  _onHandChange: (degrees) ->
    @props.onChange(degrees/STEP)

  _onMouseDown: (event)->
    @refs.hand.mouseStart(event)

  _onTouchStart: (event) ->
    @refs.hand.touchStart(event)

  # -- Render
  render: ->
    handClass = if MINUTES.indexOf(('0' + @props.selected).slice(-2)) == -1 then 'smallKnob' else ''

    <div>
      <Face
        onTouchStart={@_onTouchStart}
        onMouseDown={@_onMouseDown}
        numbers={MINUTES}
        spacing={@props.spacing}
        radius={@props.radius}
        active={@props.selected} />
      <Hand ref='hand'
        className={handClass}
        initialAngle={@props.selected * STEP}
        length={@props.radius - @props.spacing}
        onHandChange={@_onHandChange}
        origin={@props.center}
        step={STEP} />
    </div>

# -- Private constants
MINUTES = (('0' + i).slice(-2) for i in [0..55] by 5)
STEP    = 360/60
