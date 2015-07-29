localCSS = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className   : React.PropTypes.string
    value       : React.PropTypes.string

  getDefaultProps: ->
    className   : ''

  # -- Render
  render: ->
    className = "#{localCSS.root} #{@props.className} #{@props.value}"
    <span data-react-toolbox='icon' className={className} />
