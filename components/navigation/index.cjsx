require './style'
# -- Components
Button  = require '../button'
Link    = require '../link'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    actions     : React.PropTypes.array
    className   : React.PropTypes.string
    routes      : React.PropTypes.array
    type        : React.PropTypes.string

  getDefaultProps: ->
    type        : "default"
    routes      : []
    actions     : []

  # -- Render
  render: ->
    <nav data-component-navigation={@props.type}>
      { <Link key={index} {...route} /> for route, index in @props.routes }
      { <Button key={index} {...action} /> for action, index in @props.actions }
      { @props.children }
    </nav>
