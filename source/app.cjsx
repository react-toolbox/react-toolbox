"use strict"

SPArouter       = require "spa-router"
# -- Models
Session         = require "./models/session"
# -- Screens
ScreenSession   = require "./screens/session"
ScreenConsole   = require "./screens/console"

App = React.createClass

  # -- States & Properties
  getInitialState: ->
    session   : null
    context   : "campaigns"

  # -- Lifecycle
  componentWillMount: ->
    SPArouter.listen
      "/session/:id"      : (id) =>
        @setState session: false, context: id
      "/console/:context" : (context) => 
        @setState session: true, context: context

  # -- Events
  onSessionSuccess: (data) ->
    @setState session: true
    SPArouter.path "console"

  # -- Render
  render: ->
    <app>
    {
      if @state.session
        <ScreenConsole context={@state.context}/>
      else
        <ScreenSession context={@state.context} onSuccess={@onSessionSuccess} />
    }
    </app>

React.render <App />, document.body
