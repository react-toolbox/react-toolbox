css  = require './style'
Day  = require './day'
util = require '../date_utils'

module.exports = React.createClass
  displayName: 'Month',

  propTypes:
    onDayClick   : React.PropTypes.func
    selectedDate : React.PropTypes.object
    viewDate     : React.PropTypes.object

  render: ->
    <div>
      <span>{ util.monthInWords(@props.viewDate)}, {@props.viewDate.getFullYear() }</span>
      <div className={css.week}>
        { <span key={"dw#{i}"}>{ util.weekDayInWords(i).charAt(0) }</span> for i in [0..6] }
      </div>
      <div className={css.days}>
        { for i in [1..util.daysInMonth(@props.viewDate)]
            <Day key={"d#{i}"}
              day={i}
              onClick={@props.onDayClick}
              selectedDate={@props.selectedDate}
              viewDate={@props.viewDate} /> }
      </div>
    </div>
