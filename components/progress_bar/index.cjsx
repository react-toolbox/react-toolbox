localCSS = require './style'
prefixer = require '../util/prefixer'

module.exports = React.createClass

  # -- Properties
  propTypes:
    buffer        : React.PropTypes.number
    className     : React.PropTypes.string
    max           : React.PropTypes.number
    min           : React.PropTypes.number
    mode          : React.PropTypes.string
    multicolor    : React.PropTypes.bool
    type          : React.PropTypes.string
    value         : React.PropTypes.number

  getDefaultProps: ->
    buffer        : 0
    className     : ''
    max           : 100
    min           : 0
    mode          : 'indeterminate'
    multicolor    : false
    type          : 'linear'
    value         : 0

  # -- Helper methods
  calculateRatio: (value) ->
    return 0 if value < @props.min
    return 1 if value > @props.max
    return (value - @props.min) / (@props.max - @props.min)

  # -- Render
  render: ->
    className  = if @props.type == 'linear' then localCSS.linearBar else localCSS.circularBar
    className += " #{@props.className}" if @props.className
    className += " #{@props.mode}"      if @props.mode
    className += " multicolor"          if @props.multicolor

    <div className={className} role="progressbar"
         aria-valuenow={@props.value}
         aria-valuemin={@props.min}
         aria-valuemax={@props.max}>
      { if @props.type == 'circular' then @renderCircular() else @renderLinear() }
    </div>

  renderCircular: ->
    <svg className={localCSS.circle}>
      <circle className={localCSS.circlePath} style={@circularStyle()} cx="30" cy="30" r="25"/>
    </svg>

  circularStyle: ->
    _transformDasharray(@calculateRatio(@props.value)) unless @props.mode == 'indeterminate'

  renderLinear: ->
    <div>
      <span ref="buffer" data-ref="buffer" className={localCSS.bufferBar} style={@linearStyles()?.buffer}></span>
      <span ref="value" data-ref="value" className={localCSS.valueBar} style={@linearStyles()?.value}></span>
    </div>

  linearStyles: ->
    unless @props.mode == 'indeterminate'
      buffer: prefixer(transform: "scaleX(#{@calculateRatio(@props.buffer)})")
      value:  prefixer(transform: "scaleX(#{@calculateRatio(@props.value)})")

# -- Private methods
_transformDasharray = (ratio) ->
  strokeDasharray: "#{2 * Math.PI * 25 * ratio}, 400"
