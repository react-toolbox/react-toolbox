###
@todo Add a circular progress variant
###

require './style'

module.exports = React.createClass

  # -- Properties
  propTypes:
    buffer        : React.PropTypes.number
    className     : React.PropTypes.string
    indeterminate : React.PropTypes.bool
    max           : React.PropTypes.number
    min           : React.PropTypes.number
    value         : React.PropTypes.number

  getDefaultProps: ->
    buffer        : 0
    className     : ""
    indeterminate : false
    max           : 100
    min           : 0
    value         : 0

  # -- Helper methods
  calculateRatio: (value) ->
    (value - @props.min) / (@props.max - @props.min)

  # -- Render
  render: ->
    className   = @props.className
    className   += ' indeterminate' if @props.indeterminate
    valueStyle  = transformProgress(@calculateRatio(@props.value))
    bufferStyle = transformProgress(@calculateRatio(@props.buffer))

    <div data-component-progressbar
         className={className}
         role="progressbar"
         aria-valuenow={@props.value}
         aria-valuemin={@props.min}
         aria-valuemax={@props.max}>
      <span data-component-progressbar-buffer style={bufferStyle}></span>
      <span data-component-progressbar-value  style={valueStyle}></span>
    </div>

# TODO Refactor to a module to add vendor prefixes to a property
transformProgress = (ratio) ->
  WebkitTransform: "scaleX(#{ratio})"
  MsTransform:     "scaleX(#{ratio})"
  transform:       "scaleX(#{ratio})"
