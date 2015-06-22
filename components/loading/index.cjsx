###
@todo
###

require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type  : React.PropTypes.string

  getDefaultProps: ->
    type  : "normal"

  # -- Render
  render: ->
    <div data-component-loading={@props.type} data-flex="vertical center">
      <div></div><div></div><div></div>
    </div>
