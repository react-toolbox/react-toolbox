###
@todo
###

Card           = require '../../components/card'

module.exports = React.createClass

  # -- States & Properties

  # -- Events
  onClick: (event, card) ->
    console.log "onClick", arguments

  onActionClick: ->
    console.log "onClick", arguments

  # -- Render
  render: ->
    actions = [
      caption: "Save", icon: "add", onClick: @onActionClick
    ,
      caption: "Close", onClick: @onActionClick
    ]
    text  = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    legend = "Lorem Ipsum is simply dummy text"
    <section>
      <h2>Card</h2>
      <h3>Basic properties</h3>
      <Card title="Default Card" />
      <Card title="Default Card with text" text={text} />
      <Card title="Default Card with legend" legend={legend} />
      <Card title="Default Card with actions" actions={actions} />
      <Card title="Defaulr Card with image" text={text} legend={legend}
            image="http://cdn.tapquo.com/photos/soyjavi.jpg" />
      <Card title="Default Card with color and onClick event"
            text={text} legend={legend} color="#e91e63" onClick={@onClick} />

      <h3>Sizes using type property</h3>
      <Card type="small" title="Small Card"
            text={text} legend={legend} color="#00bcd4" onClick={@onClick} />
      <Card type="square" title="Square Card"
            text={text} legend={legend} color="#00bcd4" onClick={@onClick} />
      <Card type="wide" title="Wide card"
            text={text} legend={legend} color="#00bcd4" onClick={@onClick} />

    </section>
