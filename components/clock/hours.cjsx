css  = require './style'
Face = require './face'
Hand = require './hand'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    format   : React.PropTypes.oneOf(['24hr', 'ampm'])
    onChange : React.PropTypes.func

  getDefaultProps: ->
    format   : '24hr'
    onChange : null

  getInitialState: ->
    am       : false

  # -- Events
  _onHandMouseMove: (radius) ->
    if @props.format == '24hr'
      currentAm = radius < @props.radius - @props.spacing * 2
      @setState am: currentAm if @state.am != currentAm

  _onHandChange: (value) ->
    if @props.format == '24hr'
      values = if @state.am then AM_HOURS else PM_HOURS
    else
      values = AM_HOURS
    @props.onChange(parseInt(values[value/STEP])) if @props.onChange

  # -- Render
  render: ->
    innerRadius = @props.radius - @props.spacing * 2
    handRadius  = if @props.format == '24hr' && @state.am then innerRadius else @props.radius
    handLength  = handRadius - @props.spacing

    <div>
        <Face
          className={css.outerSphere}
          numbers={if @props.format == '24hr' then PM_HOURS else AM_HOURS}
          spacing={@props.spacing}
          radius={@props.radius} />
        {
          if @props.format == '24hr'
            <Face
              className={css.innerSphere}
              numbers={AM_HOURS}
              spacing={@props.spacing}
              radius={innerRadius} />
        }
        <Hand
          degrees={0}
          length={handLength}
          onHandMouseMove={@_onHandMouseMove}
          onHandChange={@_onHandChange}
          origin={@props.center}
          step={STEP} />
    </div>

# -- Private constants
AM_HOURS = [12].concat([1..11])
PM_HOURS = ['00'].concat([13..23])
STEP     = 360/12
