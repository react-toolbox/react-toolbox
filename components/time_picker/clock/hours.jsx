import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import utils from '../../utils';
import Face from './face';
import Hand from './hand';

const outerNumbers = [0, ...utils.range(13, 24)];
const innerNumbers = [12, ...utils.range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Hours',

  propTypes: {
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onChange: React.PropTypes.func,
    onHandMoved: React.PropTypes.func,
    selected: React.PropTypes.number
  },

  getInitialState () {
    return {
      inner: this.props.format === '24hr' && this.props.selected > 0 && this.props.selected <= 12
    };
  },

  onHandMove (degrees, radius) {
    let currentInner = radius < this.props.radius - this.props.spacing * innerSpacing;
    if (this.props.format === '24hr' && this.state.inner !== currentInner) {
      this.setState({inner: currentInner}, () => {
        this.props.onChange(this.valueFromDegrees(degrees));
      });
    } else {
      this.props.onChange(this.valueFromDegrees(degrees));
    }
  },

  onMouseDown (event) {
    this.refs.hand.mouseStart(event);
  },

  onTouchStart (event) {
    this.refs.hand.touchStart(event);
  },

  valueFromDegrees (degrees) {
    if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
      return innerNumbers[degrees / step];
    } else {
      return outerNumbers[degrees / step];
    }
  },

  renderInnerFace (innerRadius) {
    if (this.props.format === '24hr') {
      return (
        <Face
          onTouchStart={this.onTouchStart}
          onMouseDown={this.onMouseDown}
          numbers={innerNumbers}
          spacing={this.props.spacing}
          radius={innerRadius}
          active={this.props.selected}
        />
      );
    }
  },

  render () {
    const { format, selected, radius, spacing, center, onHandMoved } = this.props;
    const is24hr = format === '24hr';

    return (
      <div>
          <Face
            onTouchStart={this.onTouchStart}
            onMouseDown={this.onMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)}
          />
          { this.renderInnerFace(radius - spacing * innerSpacing) }
          <Hand ref='hand'
            angle={selected * step}
            length={(this.state.inner ? radius - spacing * innerSpacing : radius) - spacing}
            onMove={this.onHandMove}
            onMoved={onHandMoved}
            origin={center}
            step={step}
          />
      </div>
    );
  }
});
