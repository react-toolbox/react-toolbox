localCSS  = require './style'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    disabled  : React.PropTypes.bool
    label     : React.PropTypes.string
    onChange  : React.PropTypes.func
    value     : React.PropTypes.bool

  getDefaultProps: ->
    className : ''

  getInitialState: ->
    value     : @props.value

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    @setState value: next_props.value if next_props.value

  # -- Events
  onClick: (event) ->
    unless @props.disabled
      @setState
        value : not @state.value
      setTimeout (=> @props.onChange? event, @), 10

  # -- Render
  render: ->
    className  = "#{localCSS.root} #{@props.className}"
    className += ' checked'   if @state.value
    className += ' disabled'  if @props.disabled
    <div data-react-toolbox='switch' className={className} onClick={@onClick}>
      <span></span>
      { <label>{@props.label}</label> if @props.label }
    </div>

  # -- Extends
  getValue: ->
    @state.value

  setValue: (data) ->
    @setState value: data
