###
@todo
###

Button  = require '../../components/button'
Dialog  = require '../../components/dialog'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    actions: [
      label: "Cancel", style: "transparent", onClick: @onClose
    ]

  # -- Events
  onClose: (ref, method) ->
    @refs.dialog.hide()

  onShow: (ref, method) ->
    @refs.dialog.show()

  # -- Render
  render: ->
    <section>
      <h2>Dialog</h2>
      <p>lorem ipsum...</p>

      <Button type="raised" label="Show Dialog" onClick={@onShow} />

      <Dialog ref="dialog" type="profile" title="Your profile" className="small"
              actions={@state.actions}>
        <p>Welcome to your first Dialog</p>
      </Dialog>

    </section>
