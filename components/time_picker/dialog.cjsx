css       = require './style'
dateUtils = require '../date_utils'

Button    = require '../button'
Clock     = require '../clock'
Dialog    = require '../dialog'

module.exports = React.createClass
  displayName      : 'TimePickerDialog'

  # -- States & Properties
  propTypes:
    className      : React.PropTypes.string
    initialTime    : React.PropTypes.object
    format         : React.PropTypes.oneOf(['24hr', 'ampm'])
    onTimeSelected : React.PropTypes.func

  getDefaultProps: ->
    className     : ''
    initialTime   : new Date()
    format        : '24hr'

  getInitialState: ->
    display       : 'hours'
    time          : @props.initialTime
    actions: [
      { caption: "Cancel", type: "flat accent", onClick: @onTimeCancel },
      { caption: "Ok",     type: "flat accent", onClick: @onTimeSelected }
    ]

  # -- Events
  onClockChange: (time) ->
    @setState time: time

  onTimeCancel: (ref, method) ->
    @refs.dialog.hide()

  onTimeSelected: ->
    @props.onTimeSelected(@state.time) if @props.onTimeSelected
    @refs.dialog.hide()

  # -- Public methods
  displayMinutes: ->
    @setState display: 'minutes'

  displayHours: ->
    @setState display: 'hours'

  toggleTimeMode: ->
    @refs.clock.toggleTimeMode()

  show: ->
    @refs.dialog.show()
    setTimeout @refs.clock.handleResize, 500

  # -- Private helpers
  _formatHours: ->
    if @props.format == 'ampm' then @state.time.getHours() % 12 || 12 else @state.time.getHours()

  # -- Render
  render: ->
    className  = " "
    className += " display-#{@state.display}"
    className += " format-#{dateUtils.timeMode(@state.time)}"

    <Dialog ref="dialog" type={css.dialog} className={className} actions={@state.actions}>
      <header className={css.header}>
        <span className={css.hours} onClick={@displayHours} >
          {_twoDigits(@_formatHours())}
        </span>
        <span className={css.separator}>:</span>
        <span className={css.minutes} onClick={@displayMinutes}>
          {_twoDigits(@state.time.getMinutes())}
        </span>
        {
          if @props.format == 'ampm'
            <div className={css.ampm}>
              <span className={css.am} onClick={@toggleTimeMode}>AM</span>
              <span className={css.pm} onClick={@toggleTimeMode}>PM</span>
            </div>
        }
      </header>
      <Clock ref="clock"
             display={@state.display}
             format={@props.format}
             initialTime={@props.initialTime}
             onChange={@onClockChange} />
    </Dialog>

# -- Private helpers
_twoDigits = (number) ->
  ('0' + number).slice(-2)
