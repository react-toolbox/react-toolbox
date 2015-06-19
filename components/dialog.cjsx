###
@todo
###

Style = require './style/dialog'
Button = require './button'
Navigation = require './navigation'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    className   : React.PropTypes.string
    title       : React.PropTypes.string
    active      : React.PropTypes.bool
    actions     : React.PropTypes.array

  getDefaultProps: ->
    className   : "normal"
    active      : false
    actions     : []

  getInitialState: ->
    active      : @props.active

  # -- Render
  render: ->
    className = @props.className
    className += " active" if @state.active
    <div ref="sss" data-component-dialog={@props.type} data-flex="vertical center" className={className}>
      <div>
        {<h1>{@props.title}</h1>}
        {@props.children}
        {<Navigation actions={@props.actions}/> if @props.actions.length > 0}
      </div>
    </div>

  # -- Extends
  show: ->
    @setState active: true

  hide: ->
    @setState active: false
