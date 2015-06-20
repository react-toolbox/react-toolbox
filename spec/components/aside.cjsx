###
@todo
###

Aside           = require '../../components/aside'
Button          = require '../../components/button'

module.exports = React.createClass

  # -- States & Properties

  # -- Events
  onClick: (ref, method) ->
    @refs[ref][method]()

  # -- Render
  render: ->
    <section>
      <h2>Aside</h2>
      <Aside ref="left" hideable=true>
        <Button caption="Close" onClick={@onClick.bind null, "left", "hide"} />
      </Aside>
      <Aside ref="right" type="right"/>
      <nav>
        <Button caption="Show aside left" onClick={@onClick.bind null, "left", "show"} />
        <Button caption="Show aside right" onClick={@onClick.bind null, "right", "show"} />
      </nav>
    </section>
