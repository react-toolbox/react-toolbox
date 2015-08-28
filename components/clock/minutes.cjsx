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

  # -- Render
  render: ->
    handClass = if MINUTES.indexOf(('0' + @props.selected).slice(-2)) == -1 then 'smallKnob' else ''

    <div>
      <Face
        numbers={MINUTES}
        spacing={@props.spacing}
        radius={@props.radius}
        activeNumber={@props.selected} />
      <Hand
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
