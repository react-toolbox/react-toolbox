require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    dataSource  : React.PropTypes.Array
    ItemFactory : React.PropTypes.func
    onClick     : React.PropTypes.func
    type        : React.PropTypes.string

  getDefaultProps: ->
    attributes  : ""
    dataSource  : []
    type        : "default"

  # -- Events
  onClick: (event, item) ->
    @props.onClick? event, item

  # -- Render
  render: ->
    <ul data-component-list={@props.type}>
    {
      for item, index in @props.dataSource
        <li key={index} onClick={@onClick.bind null, item}>
          {@props.itemFactory item}
        </li>
    }
    </ul>
