###
@todo
###

SPArouter       = require "spa-router"
Header          = require "../components/header"
List            = require "../components/list"
ListItem        = require "../components/list_item"
C               = require "../modules/constants"

module.exports  = React.createClass

  # -- States & Properties
  propTypes:
    routes     : React.PropTypes.array

  getDefaultProps: ->
    routes : [
      label: "Campaigns", route: "/campaigns"
    ,
      label: "Creatives", route: "/creatives"
    ,
      label: "Users", route: "/users"
    ,
      label: "Deals", route: "/deals"
    ,
      label: "Analytics", route: "/analytics"
    ]
    subroutes  : []

  getInitialState: ->
    scrolling : false

  onScroll: (value) ->
    @setState scrolling: value

  render: ->
    context = @props.context.toUpperCase()
    mock = (id: i, title: "Title #{i}" for i in [1..128])

    for route in @props.routes
      route.className = if route.label.toLowerCase() is @props.context then "active" else ""

    <article data-screen="console" className={"scrolling" if @state.scrolling}>
      <Header title="Console"
              routes={@props.routes}
              subroutes={C.SUBROUTES[context]} />
      <List dataSource={mock} itemFactory={ListItem} onScroll={@onScroll} />
    </article>
