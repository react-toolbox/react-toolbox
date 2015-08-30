css       = require './style'
Clock     = require '../clock'
dateUtils = require '../date_utils'

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    className     : React.PropTypes.string
    initialTime   : React.PropTypes.object
    format        : React.PropTypes.oneOf(['24hr', 'ampm'])

  getDefaultProps: ->
    className     : ''
    initialTime   : new Date()
    format        : '24hr'

  getInitialState: ->
    display       : 'hours'
    time          : @props.initialTime

  # -- Events
  onClockChange: (time) ->
    @setState time: time

  # -- Public methods
  displayMinutes: ->
    @setState display: 'minutes'

  displayHours: ->
    @setState display: 'hours'

  toggleTimeMode: ->
    @refs.clock.toggleTimeMode()

  # -- Private helpers
  _formatHours: ->
    if @props.format == 'ampm' then @state.time.getHours() % 12 || 12 else @state.time.getHours()

  # -- Render
  render: ->
    className  = " #{@props.className}"
    className += " display-#{@state.display}"
    className += " format-#{dateUtils.timeMode(@state.time)}"

    <div className={css.root + className}>
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
    </div>

# -- Private helpers
_twoDigits = (number) ->
  ('0' + number).slice(-2)
