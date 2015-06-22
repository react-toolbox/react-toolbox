###
@todo
###

require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string.required
    active      : React.PropTypes.bool
    hideable    : React.PropTypes.bool
    className   : React.PropTypes.string

  getDefaultProps: ->
    type        : "left"
    active      : false
    hideable    : false
    className   : ""

  getInitialState: ->
    active      : @props.active

  # -- Events
  onClick: (event) ->
    @setState active: false if event.target is @getDOMNode()

  # -- Render
  render: ->
    className = @props.className
    className += " active" if @state.active
    className += " hideable" if @props.hideable
    <div data-component-aside={@props.type} className={className} onClick={@onClick}>
      <aside>
        { @props.children }
      </aside>
    </div>

  # -- Extends
  show: ->
    @setState active: true

  hide: ->
    @setState active: false
