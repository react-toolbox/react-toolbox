###
@todo
###

Button          = require '../../components/button'

module.exports = React.createClass

  # -- Events
  onClick: (ref, method) ->
    @refs[ref][method]()

  # -- Render
  render: ->
    <section>

      <h2>Buttons</h2>
      <p>lorem ipsum...</p>
      <Button caption="Login" disabled=false />
      <Button caption="Primary" style="primary" icon="access_alarm" />
      <Button caption="Secondary" style="secondary" />
      <Button caption="Disabled" disabled={true} />

      <Button type="circle" icon="access_alarm" />
      <Button type="circle" icon="explore" style="primary" />
      <Button type="circle" icon="zoom_in" style="secondary" />
      <Button type="circle" icon="input" disabled={true} />

    </section>
