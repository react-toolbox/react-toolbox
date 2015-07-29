localCSS = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    active      : React.PropTypes.bool
    className   : React.PropTypes.string
    hideable    : React.PropTypes.bool
    type        : React.PropTypes.string

  getDefaultProps: ->
    className   : ''
    type        : 'left'

  getInitialState: ->
    active      : @props.active

  # -- Events
  onClick: (event) ->
    @setState active: false if event.target is @getDOMNode()

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += " #{@props.type}"  if @props.type
    className += ' hideable'        if @props.hideable
    className += ' active'          if @state.active
    <div data-react-toolbox='aside' className={className} onClick={@onClick}>
      <aside className={localCSS.container}>
        { @props.children }
      </aside>
    </div>

  # -- Extends
  show: ->
    @setState active: true

  hide: ->
    @setState active: false
