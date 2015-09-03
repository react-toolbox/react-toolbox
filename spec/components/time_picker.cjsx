TimePicker = require '../../components/time_picker'

module.exports = React.createClass
  displayName: 'TimePickerTest'

  render: ->
    <div>
      <TimePicker format="ampm" />
    </div>
