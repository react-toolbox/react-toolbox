localCSS = require './style'

module.exports = React.createClass
  displayName: 'FontIcon',

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ''

  onClick: (event) ->
    @props.onClick? @props.onClick(event)

  # -- Render
  render: ->
    className = "#{localCSS.root} #{@props.className} #{@props.value}"
    <span data-react-toolbox='icon' className={className} onClick={@onClick} />
