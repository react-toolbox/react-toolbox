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
    <header ref="header" data-component="header">
      { <Navigation routes={@props.routes}/> if @props.routes }
      { <h1>{@props.title}</h1> if @props.title }
      { <Navigation routes={@props.subroutes}/> if @props.subroutes }
    </header>
