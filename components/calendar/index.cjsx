CTG       = React.addons.CSSTransitionGroup
css       = require './style'
dateTime  = require '../util/date-time'
FontIcon  = require '../font_icon'
Month     = require './month'

module.exports = React.createClass
  displayName: 'Calendar',

  # -- States & Properties
  propTypes:
    display        : React.PropTypes.oneOf(['months', 'years'])
    onChange       : React.PropTypes.func
    selectedDate   : React.PropTypes.object
    viewDate       : React.PropTypes.object

  getDefaultProps: ->
    display        : 'months'
    selectedDate   : new Date()

  getInitialState: ->
    selectedDate   : @props.selectedDate
    viewDate       : @props.selectedDate

  # -- Lifecycle
  componentDidUpdate: (prevProps, prevState) ->
    @_scrollToActive() if @refs.activeYear
    if prevState.selectedDate.getTime() != @state.selectedDate.getTime() && @props.onChange
      @props.onChange? @

  # -- Events
  onDayClick: (event) ->
    @setState
      selectedDate: dateTime.setDay(@state.viewDate, parseInt(event.target.textContent))

  onYearClick: (event) ->
    newDate = dateTime.setYear(@state.selectedDate, parseInt(event.target.textContent))
    @setState
      selectedDate: newDate
      viewDate: newDate

  # -- Private methods
  _scrollToActive: ->
    @refs.years.getDOMNode().scrollTop =
      @refs.activeYear.getDOMNode().offsetTop -
      @refs.years.getDOMNode().offsetHeight/2 +
      @refs.activeYear.getDOMNode().offsetHeight/2

  # -- Public methods
  getValue: ->
    @state.selectedDate

  incrementViewMonth: ->
    @setState
      direction: 'right'
      viewDate:  dateTime.addMonths(@state.viewDate, 1)

  decrementViewMonth: ->
    @setState
      direction: 'left'
      viewDate: dateTime.addMonths(@state.viewDate, -1)

  # -- Render
  renderYear: (year) ->
    props =
      className : if year == @state.viewDate.getFullYear() then 'active' else ''
      key       : "year-#{year}"
      onClick   : @onYearClick
    props.ref = 'activeYear' if year == @state.viewDate.getFullYear()
    return <li {...props}>{ year }</li>

  render: ->
    <div className={css.root}>
      { if @props.display == 'months'
          <div className={@state.direction}>
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
        else if @props.display == 'years'
          <ul ref="years" className={css.years}>
            { @renderYear(i) for i in [1900..2100] }
          </ul>
      }
    </div>
