css       = require './style'
Calendar  = require '../calendar'
dateUtils = require '../date_utils'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className:    React.PropTypes.string
    initialDate:  React.PropTypes.object

  getDefaultProps: ->
    className:    ''
    initialDate:  new Date()

  getInitialState: ->
    date:         @props.initialDate

  # -- Events
  onCalendarChange: (calendar) ->
    @setState
      date: dateUtils.cloneDatetime(calendar.getValue())

  # -- Render
  render: ->
    <div className={css.root}>
      <header className={css.header}>
        <p className={css.headerWeekday}>{dateUtils.weekDayInWords(@state.date.getDay())}</p>
        <p className={css.headerMonth}>{dateUtils.monthInShortWords(@state.date)}</p>
        <p className={css.headerDay}>{@state.date.getDate()}</p>
        <p className={css.headerYear}>{@state.date.getFullYear()}</p>
      </header>

      <Calendar onChange={@onCalendarChange} selectedDate={@state.date} />
    </div>
