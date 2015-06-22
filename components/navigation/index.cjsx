###
@todo
###

require './style'
# -- Components
Button  = require '../button'
Link    = require '../link'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    routes      : React.PropTypes.array
    actions     : React.PropTypes.array

  getDefaultProps: ->
    type        : "default"
    routes      : []
    actions     : []

  # -- Render
  render: ->
    <nav data-component-navigation={@props.type}>
      { <Link {...route} /> for route in @props.routes }
      { <Button {...action} /> for action in @props.actions }
      { @props.children }
    </nav>
