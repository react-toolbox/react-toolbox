css  = require './style'
Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    initialValue : React.PropTypes.number
    onChange     : React.PropTypes.func

  getDefaultProps: ->
    initialValue : 0
    onChange     : null

  getInitialState: ->
    value        : @props.initialValue

  # -- Events
  _onHandChange: (degrees) ->
    @setState value: parseInt(degrees/STEP)

  # -- Internal methods
  _valueIsExactMinute: ->
    MINUTES.indexOf(('0' + @state.value).slice(-2)) != -1

  # -- Render
  render: ->
    <div>
      <Face
        className={css.outerSphere}
        numbers={MINUTES}
        spacing={@props.spacing}
        radius={@props.radius}
        activeNumber={@state.value} />
      <Hand
        degrees={0}
        className={'small-knob' unless @_valueIsExactMinute()}
        initialAngle={@props.initialValue * STEP}
        length={@props.radius - @props.spacing}
        onHandChange={@_onHandChange}
        origin={@props.center}
        step={STEP} />
    </div>

# -- Private constants
MINUTES = (('0' + i).slice(-2) for i in [0..55] by 5)
STEP    = 360/60
