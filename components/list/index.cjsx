localCSS = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    dataSource  : React.PropTypes.array
    ItemFactory : React.PropTypes.func
    onClick     : React.PropTypes.func
    type        : React.PropTypes.string

  getDefaultProps: ->
    attributes  : ''
    className   : ''
    dataSource  : []
    type        : 'default'

  # -- Events
  onClick: (event, data, index) ->
    @props.onClick? event, item, (@refs[index] if @refs[index]?)

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type

    <ul data-react-toolbox='list' className={className}>
    {
      for data, index in @props.dataSource
        <li key={index} onClick={@onClick.bind null, data, index}>
          {@props.itemFactory data, index}
        </li>
    }
    </ul>
