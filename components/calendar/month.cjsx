css  = require './style'
Day  = require './day'
time = require '../utils/time'

module.exports = React.createClass
  displayName: 'Month',

  propTypes:
    onDayClick   : React.PropTypes.func
    selectedDate : React.PropTypes.object
    viewDate     : React.PropTypes.object

  render: ->
    <div>
      <span className={css.title}>
        { time.getFullMonth(@props.viewDate)} {@props.viewDate.getFullYear() }
      </span>
      <div className={css.week}>
        { <span key={"dw#{i}"}>{ time.getFullDayOfWeek(i).charAt(0) }</span> for i in [0..6] }
      </div>
      <div className={css.days}>
        { for i in [1..time.getDaysInMonth(@props.viewDate)]
            <Day key={"d#{i}"}
              day={i}
              onClick={@props.onDayClick}
              selectedDate={@props.selectedDate}
              viewDate={@props.viewDate} /> }
      </div>
    </div>
