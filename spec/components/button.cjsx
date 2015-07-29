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
      <Button caption="Login"/>

      <Button caption="Login" type="flat" />
      <Button caption="Primary" className="primary" icon="access_alarm" type="flat" />
      <Button caption="Secondary" className="accent" type="flat" />
      <Button caption="Disabled" disabled type="flat" />

      <Button caption="Primary" className="primary" icon="access_alarm" />
      <Button caption="Secondary" className="accent" />
      <Button caption="Disabled" disabled />
      <Button caption="loading" loading />

      <Button type="floating" icon="access_alarm" />
      <Button type="floating" icon="explore" className="primary" />
      <Button type="floating" icon="zoom_in" className="accent" />
      <Button type="floating" icon="input" disabled />
      <Button type="floating" icon="zoom_in" loading />
    </section>
