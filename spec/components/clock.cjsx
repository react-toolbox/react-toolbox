Clock = require '../../components/clock'

module.exports = React.createClass
  render: ->
    <div>
      <Clock startMode="hours" />
      <Clock startMode="minutes" />
    </div>
