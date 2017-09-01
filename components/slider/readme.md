# Slider

[Sliders](https://material.google.com/components/sliders.html) let users select a value from a continuous or discrete range of values by moving the slider thumb. The smallest value is to the left, the largest to the right. Sliders can have icons to the left and right of the bar that reflect the value intensity. The interactive nature of the slider makes it a great choice for settings that reflect intensity levels, such as volume, brightness, or color saturation.

<!-- example -->
```jsx
import Slider from 'react-toolbox/lib/slider';

class SliderTest extends React.Component {
  state = {
    slider2: 5,
    slider3: 1,
    slider4: 3
  };

  handleChange = (slider, value) => {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <p>Normal slider</p>
        <Slider value={this.state.slider1} onChange={this.handleChange.bind(this, 'slider1')} />
        <p>With steps, initial value and editable</p>
        <Slider min={0} max={10} editable value={this.state.slider2} onChange={this.handleChange.bind(this, 'slider2')} />
        <p>Pinned and with snaps</p>
        <Slider pinned snaps min={0} max={10} step={1} editable value={this.state.slider3} onChange={this.handleChange.bind(this, 'slider3')} />
        <p>Disabled</p>
        <Slider disabled min={0} max={10} value={this.state.slider4} onChange={this.handleChange.bind(this, 'slider4')} />
      </section>
    );
  }
}
```

This component can be styled by context providing a theme with the key `RTSlider` through the theme provider.

## Properties

| Name          | Type          | Default   | Description|
|:-----|:-----|:-----|:-----|
| `className`   | `String`      | `''`       | Additional class name to provide custom styling.|
| `disabled`    | `Boolean`     | `false`    | If true, component will be disabled.|
| `editable`    | `Boolean`     | `false`    | If true, an input is shown and the user can set the slider from keyboard value.|
| `max`         | `Number`      | `100`      | Maximum value permitted.|
| `min`         | `Number`      | `0`        | Minimum value permitted.|
| `onChange`    | `Function`    |            | Callback function that will be invoked when the slider value changes.|
| `onDragStart` | `Function`    | `() => {}` | Callback function that will be invoked when the slider starts being dragged. |
| `onDragStop`  | `Function`    | `() => {}` | Callback function that will be invoked when the slider stops being dragged.|
| `pinned`      | `Boolean`     | `false`    | If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.|
| `snaps`       | `Boolean`     | `false`    | If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.|
| `step`        | `Number`      | `0.01`     | Amount to vary the value when the knob is moved or increase/decrease is called.|
| `value`       | `Number`      | `0`        | Current value of the slider.|

## Theme

| Name     | Description|
|:---------|:-----------|
| `container` | Used as an inner container of the root component.|
| `editable` | Added to the root of in case the Slider is editable.|
| `innerknob` | Used to style the inner element of the knob.|
| `innerprogress` | Provided to the ProgressBar component.|
| `input` | Provided to the Input element in case it's editable.|
| `knob` | Used to style the outer layer of the knob.|
| `pinned` | Added to the root in case the Slider is pinned.|
| `pressed` | Added to the root in case the state is pressed.|
| `progress` | Used as an outer wrapper for the ProgressBar.|
| `ring` | Used in the root when the knob should be a ring.|
| `slider` | Class used for the root element.|
| `snap` | Used for every individual snap element.|
| `snaps` | Used as a wrapper for the group of snaps when it's snapped.|
