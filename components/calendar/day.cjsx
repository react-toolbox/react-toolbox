css = require './style'
dateUtils = require '../date_utils'

module.exports = React.createClass
  displayName: 'Day',

  propTypes:
    day          : React.PropTypes.number
    onClick      : React.PropTypes.func
    selectedDate : React.PropTypes.object
    viewDate     : React.PropTypes.object

  _dayStyle: ->
    marginLeft: "#{dateUtils.firstWeekDay(@props.viewDate) * 100/7}%"

  _isSelected: () ->
    isSameYear  = @props.viewDate.getFullYear() == @props.selectedDate.getFullYear()
    isSameMonth = @props.viewDate.getMonth() == @props.selectedDate.getMonth()
    isSameDay   = @props.day == @props.selectedDate.getDate()
    isSameYear && isSameMonth && isSameDay

  render: ->
    className  = " #{css.day}"
    className += " active" if @_isSelected()
    dayStyle   = @_dayStyle() if @props.day == 1

    <div className={className} style={dayStyle}>
      <span onClick={@props.onClick}>{ @props.day }</span>
    </div>
