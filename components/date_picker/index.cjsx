css            = require './style'
dateUtils      = require '../date_utils'
Input          = require '../input'
CalendarDialog = require './dialog'

module.exports = React.createClass
  displayName  : 'DatePicker'

  propTypes:
    className  : React.PropTypes.string
    value      : React.PropTypes.object

  getDefaultProps: ->
    className  :    ''

  getInitialState: ->
    value      : @props.value

  # -- Events
  openCalendarDialog: ->
    @refs.dialog.show()

  onDateSelected: (value) ->
    @refs.input.setValue(@formatDate(value))
    @setState value: value

  # -- Private methods
  formatDate: (date) ->
    day = date.getDate()
    month = dateUtils.monthInWords(date)
    year = date.getFullYear()
    "#{day} #{month} #{year}"

  # -- Public methods
  getValue: ->
    @state.value

  # -- Render
  render: ->
    <div>
      <Input
          ref="input"
          type="text"
          disabled={true}
          onClick={@openCalendarDialog}
          placeholder="Pick up date"
          value={@formatDate(@state.value) if @state.value} />
      <CalendarDialog
          ref="dialog"
          initialDate={@state.value}
          onDateSelected={@onDateSelected} />
    </div>
