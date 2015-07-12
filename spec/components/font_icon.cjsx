###
@todo
###

FontIcon = require '../../components/font_icon'

module.exports = React.createClass

  # -- Events
  onEvent: (type, event, form) ->
    console.log "[form.#{type}]", form.getValue()

  # -- Render
  render: ->
    <section>
      <h2>Font Icon</h2>
      <p>lorem ipsum...</p>

      <FontIcon value="add"/>
      <FontIcon value="access_alarm"/>
      <FontIcon value="explore"/>
      <FontIcon value="zoom_in"/>
      <FontIcon value="input"/>
    </section>
