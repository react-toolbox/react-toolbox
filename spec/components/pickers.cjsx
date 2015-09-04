DatePicker = require '../../components/date_picker'
TimePicker = require '../../components/time_picker'

module.exports = React.createClass
  displayName: 'PickersTest'

  render: ->
    time = new Date(1995,11,17);
    time.setHours(17)
    time.setMinutes(28)

    <section>
      <DatePicker />
      <TimePicker value={time} />
      <TimePicker format="ampm" />
    </section>
