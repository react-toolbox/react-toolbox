import React from 'react';
import Slider from '../../components/slider';

class SliderTest extends React.Component {
  state = {
    slider2: 5,
    slider3: 1
  };

  handleChange = (slider, value) => {
    this.setState({...this.state, [slider]: value});
  };

  render () {
    return (
      <section>
        <h5>Sliders</h5>
        <p>Normal slider</p>
        <Slider value={this.state.slider1} onChange={this.handleChange.bind(this, 'slider1')} />
        <p>With steps, initial value and editable</p>
        <Slider min={0} max={10} editable value={this.state.slider2} onChange={this.handleChange.bind(this, 'slider2')} />
        <p>Pinned and with snaps</p>
        <Slider pinned snaps min={0} max={10} step={2} editable value={this.state.slider3} onChange={this.handleChange.bind(this, 'slider3')} />
        <p>Disabled status</p>
        <Slider disabled pinned snaps min={0} max={10} step={2} editable value={this.state.slider3} onChange={this.handleChange.bind(this, 'slider3')} />
      </section>
    );
  }
}

export default SliderTest;
