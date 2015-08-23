css  = require './style'
Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    onChange : React.PropTypes.func

  # -- Events
  _onHandChange: (value) ->
    @props.onChange(parseInt(value/STEP)) if @props.onChange

  # -- Render
  render: ->
    <div>
      <Face
        className={css.outerSphere}
        numbers={MINUTES}
        spacing={@props.spacing}
        radius={@props.radius} />
      <Hand
        degrees={0}
        length={@props.radius - @props.spacing}
        onHandChange={@_onHandChange}
        origin={@props.center}
        step={STEP} />
    </div>

# -- Private constants
MINUTES = (('0' + i).slice(-2) for i in [0..55] by 5)
STEP    = 360/60
