###
@todo
###

Navigation = require './navigation'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    title       : React.PropTypes.string.required
    routes      : React.PropTypes.array.required
    subroutes   : React.PropTypes.array

  getDefaultProps: ->
    routes      : []
    title       : undefined
    subroutes   : []

  getInitialState: ->
    expanded    : @props.expanded

  # -- Lifecycle
  componentDidUpdate: (nextProps) ->
    @refs.header.getDOMNode().classList.remove "expanded"

  # -- Events
  onProfile: (event) ->
    event.preventDefault()
    @refs.header.getDOMNode().classList.toggle "expanded"

  # -- Render
  render: ->
    <header ref="header" data-component="header" data-flex="horizontal center grow">
      <div>
        <Navigation routes={@props.routes} role="text"/>
        <h1>{@props.title}</h1>
        { <Navigation routes={@props.subroutes} role="text"/> if @props.subroutes }
      </div>
      <nav data-role="circle">
        <button className="main">+</button>
        <button>?</button>
      </nav>
    </header>
