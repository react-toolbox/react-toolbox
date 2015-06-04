###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    origin      : React.PropTypes.object
    colour      : React.PropTypes.string

  getDefaultProps: ->
    origin      : undefined
    colour      : "#ffffff"

  # -- Lifecycle
  componentDidMount: ->
    el = @getDOMNode()
    for key in ["animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd"]
      el.addEventListener key, =>
        el.classList.remove "active"
      , false

  componentDidUpdate: ->
    @getDOMNode().classList.add "active"

  # -- Render
  render: ->
    <div  data-component-ripple
          style={left: @props.origin?.left, top: @props.origin?.top} />
