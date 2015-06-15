###
@todo
###

# -- Basic Components
Button          = require '../../components/button'
Dialog          = require '../../components/dialog'
Form            = require '../../components/form'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    valid   : false

  # -- Events
  onFormValid: (event, form) ->
    @setState valid: true

  onFormError: (event, form) ->
    @setState valid: false

  onClose: ->
    @refs.dialog.hide()

  onLogout: ->
    window.location = '/#/login'

  onSubmit: ->
    @refs.dialog.hide()

  # -- Render
  render: ->
    actions = [
      caption: "Cancel", style: "transparent", onClick: @onClose
    ,
      caption: "Save", style: "secondary transparent", disabled: (not @state.valid), onClick: @onSubmit
    ]

    <Dialog ref="dialog" type="profile" title="Your profile" className="small" actions={actions}>
      <Form ref="form" onValid={@onFormValid} onError={@onFormError} />
    </Dialog>

  # -- Extends
  show: ->
    @refs.dialog.show()
