localCSS  = require './style'
Button    = require '../button'
Link      = require '../link'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    actions     : React.PropTypes.array
    className   : React.PropTypes.string
    routes      : React.PropTypes.array
    type        : React.PropTypes.string

  getDefaultProps: ->
    actions     : []
    className   : ''
    type        : 'default'
    routes      : []

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type

    <nav data-react-toolbox='navigation' className={className}>
      { <Link key={index} {...route} /> for route, index in @props.routes }
      { <Button key={index} {...action} /> for action, index in @props.actions }
      { @props.children }
    </nav>
