css = require './style'

module.exports = React.createClass

  # -- States & Properties
  getDefaultProps: ->
    numbers      : []
    radius       : 0
    activeNumber : null

  # -- Internal methods
  _numberStyle: (radius, num) ->
    position  : 'absolute'
    left      : (radius + radius * Math.sin(360 * (Math.PI/180) / 12 * (num - 1)) + @props.spacing)
    top       : (radius - radius * Math.cos(360 * (Math.PI/180) / 12 * (num - 1)) + @props.spacing)

  _faceStyle: ->
    height    : @props.radius * 2
    width     : @props.radius * 2

  # -- Render
  render: ->
    <div ref="root" className={css.face} onMouseDown={@props.onMouseDown} style={@_faceStyle()}>
      { for i, k in @props.numbers
          <span className={css.number + (if parseInt(i) == @props.activeNumber then ' active' else '')}
                style={@_numberStyle(@props.radius - @props.spacing, k + 1)}
                key={i} >
            {i}
          </span> }
    </div>
