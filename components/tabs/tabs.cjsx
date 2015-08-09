localCSS = require './style'
Tab      = require './tab'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className : React.PropTypes.string
    index     : React.PropTypes.number.required
    onChange  : React.PropTypes.func

  getDefaultProps: ->
    className : ""
    index     : 0

  getInitialState: ->
    index     : @props.index

  # -- Lifecycle
  componentWillReceiveProps: (next_props) ->
    @setState index: next_props.index or @state.index

  # -- Events
  onClick: (index, event, ref) ->
    @setState index: index
    @props.onChange? @

  # -- Render
  render: ->
    labels = []
    tabs   = React.Children.map @props.children, (tab, index) =>
      active = @state.index is index

      className  = tab.props.className
      className += ' active'    if active
      className += ' disabled'  if tab.props.disabled
      className += ' hidden'    if tab.props.hidden
      labels.push
        className     : className
        label         : tab.props.label
        key           : index
        onClick       : (@onClick.bind null, index unless tab.props.disabled)

      React.addons.cloneWithProps tab,
        active        : active
        key           : index
        tabIndex      : index

    <div data-react-toolbox='tabs'
         className={localCSS.root + ' ' + @props.className}
         data-flex='vertical'>
      <nav data-flex='horizontal'>
        { <label {...props}>{props.label}</label> for props in labels }
      </nav>
      { tabs }
    </div>

