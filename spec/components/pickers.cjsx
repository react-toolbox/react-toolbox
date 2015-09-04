DatePicker = require '../../components/date_picker'
TimePicker = require '../../components/time_picker'

module.exports = React.createClass
  displayName: 'PickersTest'

  render: ->
    datetime = new Date(1995,11,17)
    datetime.setHours(17)
    datetime.setMinutes(28)

    <section>
      <h2>Pickers</h2>

      <DatePicker />
      <DatePicker value={datetime} />
      <TimePicker value={datetime} />
      <TimePicker format="ampm" />
    </section>
