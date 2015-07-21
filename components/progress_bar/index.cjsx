localCss = require './style'
prefixer = require "../prefixer"

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
    (value - @props.min) / (@props.max - @props.min)

  # -- Render
  render: ->
    className  = if @props.type == 'linear' then localCss.linearBar else localCss.circularBar
    className += " #{localCss.root} #{@props.mode} #{@props.className}"
    className += " multicolor" if @props.multicolor

    <div role="progressbar"
         className={className}
         aria-valuenow={@props.value}
         aria-valuemin={@props.min}
         aria-valuemax={@props.max}>
      { if @props.type == 'circular' then @renderCircular() else @renderLinear() }
    </div>

  renderCircular: ->
    unless @props.mode == 'indeterminate'
      style = _transformDasharray(@calculateRatio(@props.value))
    <svg className={localCss.circle}>
      <circle className={localCss.circlePath} style={style} cx="30" cy="30" r="25"/>
    </svg>

  renderLinear: ->
    unless @props.mode == 'indeterminate'
      bufferStyle = prefixer.transform("scaleX(#{@calculateRatio(@props.buffer)})")
      valueStyle  = prefixer.transform("scaleX(#{@calculateRatio(@props.value)})")
    <div>
      <span className={localCss.bufferBar} style={bufferStyle}></span>
      <span className={localCss.valueBar}  style={valueStyle}></span>
    </div>

# -- Private methods
_transformDasharray = (ratio) ->
  strokeDasharray: "#{2 * Math.PI * 45 * ratio}, 400"
