DatePicker = require '../../components/date_picker'
TimePicker = require '../../components/time_picker'

module.exports = React.createClass
  displayName: 'PickersTest'

  render: ->
    <section>
      <DatePicker />
      <TimePicker format="ampm" />
    </section>
