css        = require './style'
Input      = require '../input'
TimeDialog = require './dialog'

module.exports = React.createClass
  displayName     : 'TimePicker'

  # -- States & Properties
  propTypes:
    className     : React.PropTypes.string
    format        : React.PropTypes.oneOf(['24hr', 'ampm'])
    value         : React.PropTypes.object

  getDefaultProps: ->
    className     : ''
    format        : '24hr'

  getInitialState: ->
    value         : @props.value

  # -- Events
  onTimeSelected: (time) ->
    @refs.input.setValue(@formatTime(time))
    @setState value: time

  openTimeDialog: ->
    @refs.dialog.show()

  # -- Private methods
  formatTime: (date) ->
    hours = date.getHours()
    mins = date.getMinutes().toString()

    if (@props.format == "ampm")
      isAM = hours < 12
      hours = hours % 12
      additional = if isAM then " am" else " pm"
      hours = (hours || 12).toString()
      mins = "0" + mins if (mins.length < 2 )
      return hours + (if mins == "00" then "" else ":" + mins) + additional

    hours = hours.toString()
    hours = "0" + hours if (hours.length < 2)
    mins  = "0" + mins  if (mins.length < 2)
    return hours + ":" + mins

  # -- Render
  render: ->
    <div>
      <Input
          ref="input"
          type="text"
          disabled={true}
          onClick={@openTimeDialog}
          placeholder="Pick up time"
          value={@formatTime(@state.value) if @state.value} />
      <TimeDialog
          ref="dialog"
          initialTime={@state.value}
          format={@props.format}
          onTimeSelected={@onTimeSelected} />
    </div>
