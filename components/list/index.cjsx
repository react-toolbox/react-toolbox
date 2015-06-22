###
@todo
###

require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    type        : React.PropTypes.string
    dataSource  : React.PropTypes.Array
    ItemFactory : React.PropTypes.func
    onClick     : React.PropTypes.func

  getDefaultProps: ->
    type        : "default"
    dataSource  : []

  # -- Events
  onClick: (event) ->


  # -- Render
  render: ->
    <ul data-component-list={@props.type}>
    {
      for item, index in @props.dataSource
        <li key={index} onClick={@props.onClick.bind null, item}>
          {@props.itemFactory @props.dataSource[index]}
        </li>
    }
    </ul>
