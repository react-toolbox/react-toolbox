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
    @props.onClick.call @, event

  # -- Render
  render: ->
    <button data-component="button"
            onClick={@onClick}
            className={@props.style}
            disabled={@props.disabled}>
      { <span className="icon {{@props.icon}}"></span> if @props.icon }
      <abbr>{@props.caption}</abbr>
    </button>
