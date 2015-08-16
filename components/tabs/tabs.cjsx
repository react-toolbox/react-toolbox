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
    pointer   : {}

  # -- Lifecycle
  componentDidMount: ->
    @setState pointer: _pointerPosition @state.index, @refs.navigation.getDOMNode()

  componentWillReceiveProps: (next_props) ->
    index = next_props.index or @state.index
    @setState
      index   : index
      pointer : _pointerPosition index, @refs.navigation.getDOMNode()

  # -- Events
  onClick: (index, event, ref) ->
    @setState
      index   : index
      pointer : _pointerPosition index, @refs.navigation.getDOMNode()
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
      <nav ref='navigation' data-flex='horizontal'>
        { <label {...props}>{props.label}</label> for props in labels }
      </nav>
      <span className={localCSS.pointer} style={@state.pointer}></span>
      { tabs }
    </div>

# -- Private methods
_pointerPosition = (index = 0, navigation) ->
  label = navigation.children[index].getBoundingClientRect()
  style =
    top   : "#{navigation.getBoundingClientRect().height}px"
    left  : "#{label.left}px"
    width : "#{label.width}px"
