localCSS = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    loading   : React.PropTypes.bool
    origin    : React.PropTypes.object

  getDefaultProps: ->
    className : ''
    loading   : false

  getInitialState: ->
    className : undefined

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    @setState className: "active" if next_props.origin?

  componentDidMount: ->
    el = @getDOMNode()
    for key in ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd']
      el.addEventListener key, (=> @setState className: undefined), false
    @setState className: 'active' if @props.origin?

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className} #{@state.className}"
    className += ' loading' if @props.loading
    <div  data-react-toolbox='ripple' className={className}
          style={
            left  : @props.origin?.left,
            top   : @props.origin?.top,
            width : @props.origin?.width,
            height: @props.origin?.width} />
