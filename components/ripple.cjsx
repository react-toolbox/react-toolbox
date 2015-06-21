###
@todo
###

Style = require './style/ripple'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    origin    : React.PropTypes.object
    loading   : React.PropTypes.bool

  getDefaultProps: ->
    loading   : false

  getInitialState: ->
    className : undefined

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    @setState className: "active" if next_props.origin?

  componentDidMount: ->
    el = @getDOMNode()
    for key in ["animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd"]
      el.addEventListener key, (=> @setState className: undefined), false

  # -- Render
  render: ->
    className = @state.className
    className += " loading" if @props.loading
    <div  data-component-ripple
          className={className}
          style={
            left  : @props.origin?.left,
            top   : @props.origin?.top,
            width : @props.origin?.width,
            height: @props.origin?.width} />
