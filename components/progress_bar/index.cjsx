###
@todo Add a circular progress variant
###

require './style'

module.exports = React.createClass

  # -- Properties
  propTypes:
    buffer        : React.PropTypes.number
    max           : React.PropTypes.number
    min           : React.PropTypes.number
    value         : React.PropTypes.number
    indeterminate : React.PropTypes.bool

  getDefaultProps: ->
    buffer        : 0
    indeterminate : false
    max           : 100
    min           : 0
    value         : 0

  # -- Helper methods
  calculateRatio: (value) ->
    (value - @props.min) / (@props.max - @props.min)

  transformProgress: (ratio) ->
    WebkitTransform: "scaleX(#{ratio})"
    MsTransform:     "scaleX(#{ratio})"
    transform:       "scaleX(#{ratio})"

  # -- Render
  render: ->
    className      = 'indeterminate' if @props.indeterminate
    primaryRatio   = @calculateRatio(@props.value)
    secondaryRatio = @calculateRatio(@props.buffer)

    <div data-component-progressbar
         className={className}
         role="progressbar"
         aria-valuenow={@props.value}
         aria-valuemin={@props.min}
         aria-valuemax={@props.max}>
      <span data-component-progressbar-buffer style={@transformProgress(secondaryRatio)}></span>
      <span data-component-progressbar-value  style={@transformProgress(primaryRatio)}></span>
    </div>
