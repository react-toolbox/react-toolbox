css       = require './style'
dateUtils = require '../date_utils'

Dialog    = require '../dialog'
Calendar  = require '../calendar'

module.exports = React.createClass
  displayName: 'CalendarDialog'

  # -- States & Properties
  propTypes:
    className      : React.PropTypes.string
    initialDate    : React.PropTypes.object
    onDateSelected : React.PropTypes.func

  getDefaultProps: ->
    className      : ''
    initialDate    : new Date()

  getInitialState: ->
    date: @props.initialDate
    actions: [
      { caption: "Cancel", type: "flat accent", onClick: @onDateCancel },
      { caption: "Ok",     type: "flat accent", onClick: @onDateSelected }
    ]

  # -- Events
  onCalendarChange: (calendar) ->
    @setState date: dateUtils.cloneDatetime(calendar.getValue())

  onDateCancel: (ref, method) ->
    @refs.dialog.hide()

  onDateSelected: ->
    @props.onDateSelected(@state.date) if @props.onDateSelected
    @refs.dialog.hide()

  # -- Public methods
  show: ->
    @refs.dialog.show()

  # -- Render
  render: ->
    className  = " "

    <Dialog ref="dialog" type={css.dialog} className={className} actions={@state.actions}>
      <header className={css.header}>
        <span className={css.headerWeekday}>{dateUtils.weekDayInWords(@state.date.getDay())}</span>
        <span className={css.headerMonth}>{dateUtils.monthInShortWords(@state.date)}</span>
        <span className={css.headerDay}>{@state.date.getDate()}</span>
        <span className={css.headerYear}>{@state.date.getFullYear()}</span>
      </header>

      <div className={css.calendarWrapper}>
        <Calendar onChange={@onCalendarChange} selectedDate={@state.date} />
      </div>
    </Dialog>
