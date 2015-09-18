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
      <Button className="accent" label="Flat button" />
      <Button className="primary" type="raised" label="Raised" />
      <Button className="accent" type="raised" label="Raised" icon="assignment_turned_in" />
      <Button className="primary" type="floating" icon="add" />
      <Button className="accent mini" type="floating" icon="add" />
    </section>
