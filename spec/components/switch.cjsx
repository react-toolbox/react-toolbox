###
@todo
###

Switch = require '../../components/switch'

module.exports = React.createClass

  # -- Events
  onChange: (event, instance) ->
   console.log "[SWITCH]", instance.getValue()

  # -- Render
  render: ->
    <section>
      <h2>Switches</h2>

      <p>Default</p>
      <Switch />

      <p>With properties</p>
      <Switch value={true} label="Online" onChange={@onChange} />

      <p>Disabled</p>
      <Switch disabled/>
    </section>
