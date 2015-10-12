import React from 'react';
import Slider from '../../components/slider';

export default React.createClass({
  displayName: 'SliderTest',

  render () {
    return (
      <section>
        <h5>Sliders</h5>
        <p>Normal slider</p>
        <Slider />
        <p>With steps, initial value and editable</p>
        <Slider value={5} min={0} max={10} editable />
        <p>Pinned and with snaps</p>
        <Slider pinned snaps value={1} min={0} max={10} step={1} editable />
      </section>
    );
  }
});
