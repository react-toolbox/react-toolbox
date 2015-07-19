Slider = require '../../components/slider'

module.exports = React.createClass
  render: ->
    <section>
      <h2>Sliders</h2>
      <p>Normal slider</p>
      <Slider />
      <p>With steps, initial value and editable</p>
      <Slider value={5} min={0} max={10} editable />
      <p>Pinned and with snaps</p>
      <Slider pinned snaps value={1} min={0} max={10} step={1} editable />
    </section>
