"use strict"

SPArouter       = require "spa-router"
# -- components

Router          = require "./components/router"
# -- forms
FormSession     = require "./forms/form.session"
# -- Screens
ScreenConsole   = require "./screens/console"
ScreenForm      = require "./screens/form"
# -- Modules
C               = require "./modules/constants"

App = React.createClass

  # -- Lifecycle
  componentWillMount: ->
    SPArouter.listen
      "/session/:context" : (context) =>
        @setState session: false, context: context
      "/:context/:area" : (context, area) =>
        @setState session: true, context: context, area: area

  # -- Events
  onSessionSuccess: (data) ->
    header_style = @refs.header.getDOMNode().classList
    header_style.add "disabled"
    header_style.remove "expanded"
    setTimeout =>
      SPArouter.path "campaigns/list"
    , C.ANIMATION.DURATION
    setTimeout =>
      header_style.remove "disabled"
    , (C.ANIMATION.DURATION * 2)

  onConsoleScroll: (value) -> @setState scrolling: value

  onLogout: -> SPArouter.path "session/login"

  # -- Render
  render: ->
    # return <ScreenForm />

    if @state.session
      avatar = "http://soyjavi.com/assets/img/soyjavi.hat.jpg"
    else
      avatar = "./assets/img/avatar.jpg"

    <app className={"scrolling" if @state.scrolling}>
      <header ref="header"
              data-flex="horizontal center grow"
              data-flex-justify="start"
              className={"expanded" unless @state.session}>
        <img src={avatar} data-flex-grow="min" onClick={@onLogout}/>
        {
          if @state.session
            <Router context={@state.context} area={@state.area} />
          else
            <FormSession context={@state.context} onSuccess={@onSessionSuccess}/>
        }
      </header>
    { <ScreenConsole context={@state.context} onScroll={@onConsoleScroll}/> if @state.session }
    </app>

React.render <App />, document.body
