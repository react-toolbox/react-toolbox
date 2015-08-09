CTG       = React.addons.CSSTransitionGroup
css       = require './style'
FontIcon  = require '../font_icon'
dateUtils = require '../date_utils'

module.exports = React.createClass

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

  componentDidUpdate: (prevProps, prevState) ->
    @props.onChange? @ if prevState.selectedDate.getTime() != @state.selectedDate.getTime()

  # -- Events
  onDayClick: (event) ->
    day = parseInt(event.target.textContent)
    newDate = dateUtils.cloneDatetime(@state.viewDate)
    newDate.setDate(day)
    @setState selectedDate: newDate

  # -- Handle month increment and decrement
  incrementViewMonth: ->
    @setState
      viewDate:  dateUtils.addMonths(@state.viewDate, 1)
      direction: 'right'

  decrementViewMonth: ->
    @setState
      viewDate: dateUtils.addMonths(@state.viewDate, -1)
      direction: 'left'

  # -- Render helpers
  isDaySelected: (day) ->
    isSameYear  = @state.viewDate.getFullYear() == @state.selectedDate.getFullYear()
    isSameMonth = @state.viewDate.getMonth() == @state.selectedDate.getMonth()
    isSameDay   = day == @state.selectedDate.getDate()
    if isSameYear && isSameMonth && isSameDay then 'active' else ''

  # -- Render
  render: ->
    <div className={"#{css.root} #{@state.direction}"}>

      {# Controllers to move to prev and next month }
      <FontIcon className={css.prevMonth} value='chevron_left'  onClick={@decrementViewMonth} />
      <FontIcon className={css.nextMonth} value='chevron_right' onClick={@incrementViewMonth} />

      {# Calendar itself }
      <CTG transitionName='slide-horizontal'>
        <div key={@state.viewDate.getMonth()}>
          <div className={css.title}>
            {"#{dateUtils.monthInWords(@state.viewDate)}, #{@state.viewDate.getFullYear()}"}
          </div>

          <div className={css.calendar}>
            <div className={css.calendarWeekDays}>
              {
                for i in [0..6]
                  <span className={css.calendarWeekDay}
                        key={"dw#{i}"}>
                    {dateUtils.weekDayInWords(i).charAt(0)}
                  </span>
              }
            </div>
            <div className={css.calendarBody}>
              <span key={"d1"}
                    onClick={@onDayClick}
                    className={css.calendarBodyDay + ' ' + @isDaySelected(1)}
                    style={marginLeft: "#{dateUtils.firstWeekDay(@state.viewDate) * 100/7}%"}>
                1
              </span>
              {
                for i in [2..dateUtils.daysInMonth(@state.viewDate)]
                  <span key={"d#{i}"}
                        onClick={@onDayClick}
                        className={css.calendarBodyDay + ' ' + @isDaySelected(i)}>
                    {i}
                  </span>
              }
            </div>
          </div>
        </div>
      </CTG>
    </div>

  getValue: ->
    @state.selectedDate
