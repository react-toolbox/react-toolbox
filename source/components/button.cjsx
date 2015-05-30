###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    caption     : React.PropTypes.string
    icon        : React.PropTypes.string

  getDefaultProps: ->
    icon        : undefined

  # -- Events
  onClick: (event) ->
    event.preventDefault()
    console.log ">"

  # -- Render
  render: ->
    <button onClick={@onClick} className={@props.style}>
      <abbr>{@props.caption}</abbr>
    </button>
