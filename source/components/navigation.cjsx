###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    routes     : React.PropTypes.array

  getDefaultProps: ->
    routes     : []

  # -- Events
  onBack: (event) ->
    event.preventDefault()
    event.stopPropagation()
    window.history.back()

  # -- Render
  render: ->
    <nav data-role={@props.role}>
    {
      for route, index in @props.routes
        method = if route.back is true then @onBack
        <a href={"#" + route.route} key={index} className={route.className} onClick={method}>
          {route.label}
        </a>
    }
    </nav>
