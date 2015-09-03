css       = require './style'
dateUtils = require '../date_utils'

CTG       = React.addons.CSSTransitionGroup
FontIcon  = require '../font_icon'
Month     = require './month'

module.exports = React.createClass
  displayName: 'Calendar',

  # -- States & Properties
  propTypes:
    className:      React.PropTypes.string
    onChange:       React.PropTypes.func
    selectedDate:   React.PropTypes.object
    viewDate:       React.PropTypes.object

  getDefaultProps: ->
    className:       ''
    selectedDate:   new Date()
    viewDate:       new Date()

  getInitialState: ->
    selectedDate:   @props.selectedDate
    viewDate:       @props.viewDate

  # -- Lifecycle
  componentDidUpdate: (prevProps, prevState) ->
    if prevState.selectedDate.getTime() != @state.selectedDate.getTime() && @props.onChange
      @props.onChange? @

  # -- Events
  onDayClick: (event) ->
    day = parseInt(event.target.textContent)
    newDate = dateUtils.cloneDatetime(@state.viewDate)
    newDate.setDate(day)
    @setState selectedDate: newDate

  # -- Public methods
  incrementViewMonth: ->
    @setState
      viewDate:  dateUtils.addMonths(@state.viewDate, 1)
      direction: 'right'

  decrementViewMonth: ->
    @setState
      viewDate: dateUtils.addMonths(@state.viewDate, -1)
      direction: 'left'

  getValue: ->
    @state.selectedDate

  # -- Render
  render: ->
    <div className={"#{css.root} #{@state.direction}"}>
      <FontIcon className={css.prev} value='chevron_left'  onClick={@decrementViewMonth} />
      <FontIcon className={css.next} value='chevron_right' onClick={@incrementViewMonth} />
      <CTG transitionName='slide-horizontal'>
        <Month
          key={@state.viewDate.getMonth()}
          viewDate={@state.viewDate}
          selectedDate={@state.selectedDate}
          onDayClick={@onDayClick} />
      </CTG>
    </div>
