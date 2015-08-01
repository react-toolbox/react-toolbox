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
  onClick: (event, data) ->
    @props.onClick? event, @, data

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type

    <ul data-react-toolbox='list' className={className}>
    {
      for item, index in @props.dataSource
        <li key={index} onClick={@onClick.bind null, item}>
          {@props.itemFactory item}
        </li>
    }
    </ul>
