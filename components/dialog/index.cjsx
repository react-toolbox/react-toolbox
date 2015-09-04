localCSS    = require './style'
Button      = require '../button'
Navigation  = require '../navigation'

module.exports = React.createClass
  displayName   : 'Dialog'

  # -- States & Properties
  propTypes:
    actions     : React.PropTypes.array
    active      : React.PropTypes.bool
    className   : React.PropTypes.string
    title       : React.PropTypes.string
    type        : React.PropTypes.string

  getDefaultProps: ->
    actions     : []
    className   : 'normal'

  getInitialState: ->
    active      : @props.active

  # -- Render
  render: ->
    rootClass       = localCSS.root
    rootClass      += ' active' if @state.active
    containerClass  = "#{localCSS.container} #{@props.className}"
    containerClass += " #{@props.type}" if @props.type

    <div data-react-toolbox='dialog' data-flex='vertical center' className={rootClass}>
      <div className={containerClass}>
        {<h1>{@props.title}</h1> if @props.title}
        {@props.children}
        {<Navigation actions={@props.actions}/> if @props.actions.length > 0}
      </div>
    </div>

  # -- Extends
  show: ->
    @setState active: true

  hide: ->
    @setState active: false
