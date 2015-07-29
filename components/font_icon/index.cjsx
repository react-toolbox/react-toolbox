localCSS = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    value : React.PropTypes.string

  # -- Render
  render: ->
    className = "#{localCSS.root} #{@props.value}"
    <span data-react-toolbox='icon' className={className} />
