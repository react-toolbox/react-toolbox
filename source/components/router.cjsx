###
@todo
###

Button     = require "./button"
Navigation = require "./navigation"
C          = require "../modules/constants"

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    routes     : React.PropTypes.array.required

  getDefaultProps: ->
    routes : [
      label: "Campaigns", route: "/campaigns/list"
    ,
      label: "Creatives", route: "/creatives/list"
    ,
      label: "Users", route: "/users/list"
    ,
      label: "Deals", route: "/deals/list"
    ,
      label: "Analytics", route: "/analytics"
    ]

  # -- Render
  render: ->
    for route in @props.routes
      route.className = if route.label.toLowerCase() is @props.context then "active" else ""
    for route in subroutes = C.SUBROUTES[@props.context.toUpperCase()]
      route.className = if route.label.toLowerCase() is @props.area then "active" else ""
    <div>
      <div data-flex-grow="max">
        <Navigation routes={@props.routes} role="text"/>
        <h1>Console</h1>
        <Navigation routes={subroutes} role="text"/>
      </div>
      <nav data-role="circle">
        <Button caption="+" style="circle primary"/>
        <Button caption="?" style="circle secondary"/>
      </nav>
    </div>
