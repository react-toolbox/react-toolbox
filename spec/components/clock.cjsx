Clock = require '../../components/clock'

module.exports = React.createClass
  render: ->
    <div>
      <Clock mode="hours" />
      <Clock mode="minutes" />
    </div>
