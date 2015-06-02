###
@todo
###

# -- Components
Form            = require "../components/form"

module.exports  = React.createClass

  # -- Events
  onFormSubmit: (event, value) ->
    console.log "onFormSubmit", value

  onFormError: (event, value) ->
    console.log "onFormChange", arguments

  onFormValid: (event, value) ->
    console.log "onFormChange", arguments

  # -- Render
  render: ->
    attributes = [
      ref: "name", label: "Your Name", required: true
    ,
      ref: "description", type: "textarea", label: "Description", value: "Doer"
    ,
      ref: "years", type: "number", label: "Years"
    ,
      ref: "twitter", label: "Nickname", disabled: true
    ,
      type: "Button"
    ]
    <section data-screen="form">
      <Form attributes={attributes}
            onSubmit={@onFormSubmit}
            onError={@onFormError}
            onValid={@onFormValid}
            />
    </section>
