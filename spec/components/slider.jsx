/* global React */

import Slider from '../../components/slider';

export default React.createClass({
  displayName: 'SliderTest',

  render () {
    return (
      <section>
        <h2 style={{marginTop: '1rem'}}>Sliders</h2>
        <p>Normal slider</p>
        <Slider />
        <p>With steps, initial value and editable</p>
        <Slider value={5} min={0} max={10} editable />
        <p>Pinned and with snaps</p>

        <Slider pinned value={1} min={0} max={10} step={1} editable />
      </section>
    );
  }
});
