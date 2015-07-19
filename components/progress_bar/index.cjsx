###
@todo
v2
  - can set different sizes for circular progress
  - maybe a multicolor indeterminate circular progress bar
###

require './style'

prefixer = require "../prefixer"

module.exports = React.createClass

  # -- Properties
  propTypes:
    buffer        : React.PropTypes.number
    className     : React.PropTypes.string
    max           : React.PropTypes.number
    min           : React.PropTypes.number
    mode          : React.PropTypes.string
    type          : React.PropTypes.string
    value         : React.PropTypes.number

  getDefaultProps: ->
    buffer        : 0
    className     : ''
    max           : 100
    min           : 0
    mode          : 'indeterminate'
    type          : 'linear'
    value         : 0

  # -- Helper methods
  calculateRatio: (value) ->
    (value - @props.min) / (@props.max - @props.min)

  # -- Render
  render: ->
    className  = "#{@props.type} #{@props.className} #{@props.mode}"
    <div data-component-progressbar role="progressbar"
         className={className}
         aria-valuenow={@props.value}
         aria-valuemin={@props.min}
         aria-valuemax={@props.max}>
      { if @props.type == 'circular' then @renderCircular() else @renderLinear() }
    </div>

  renderCircular: ->
    style = transformDasharray(@calculateRatio(@props.value)) unless @props.mode == 'indeterminate'
    <svg data-component-progressbar-circle>
      <circle style={style} data-component-progressbar-circle-path cx="50" cy="50" r="45"/>
    </svg>

  renderLinear: ->
    unless @props.mode == 'indeterminate'
      bufferStyle = prefixer.transform("scaleX(#{@calculateRatio(@props.buffer)})")
      valueStyle  = prefixer.transform("scaleX(#{@calculateRatio(@props.value)})")
    <div>
      <span data-component-progressbar-buffer style={bufferStyle}></span>
      <span data-component-progressbar-value  style={valueStyle}></span>
    </div>

# -- Private methods
transformDasharray = (ratio) ->
  strokeDasharray: "#{2 * Math.PI * 45 * ratio}, 400"
