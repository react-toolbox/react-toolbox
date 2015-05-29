###
@todo
###

SPArouter       = require "spa-router"
Header          = require "../components/header"
C               = require "../modules/constants"

module.exports  = React.createClass

  # -- States & Properties
  propTypes:
    routes     : React.PropTypes.array

  getDefaultProps: ->
    routes : [
      label: "Campaigns", route: "/console/campaigns"
    ,
      label: "Creatives", route: "/console/creatives"
    ,
      label: "Users", route: "/console/users"
    ,
      label: "Deals", route: "/console/deals"
    ,
      label: "Analytics", route: "/console/analytics"
    ]
    subroutes  : []

  render: ->
    context = @props.context.toUpperCase()
    <article data-screen="console">
      <Header title="Console" routes={@props.routes} subroutes={C.SUBROUTES[context]} />
      <section className="scroll">
        <ul>
        {
          for i in [1..128]
            <li data-flex="horizontal grow">
              <img src="http://" data-flex-grow="min" />
              <div data-flex="vertical" data-flex-grow="max">
                <strong>Title {{i}}</strong>
                <small>lorem ipsum....</small>
              </div>
              <span data-flex-grow="min">time ago...</span>
            </li>
        }
        </ul>
      </section>
    </article>
