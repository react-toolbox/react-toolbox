import React, { Component, PropTypes } from 'react';
import utils from '../utils/utils.js';
import Hand from './ClockHand.js';
import Face from './ClockFace.js';

const outerNumbers = [0, ...utils.range(13, 24)];
const innerNumbers = [12, ...utils.range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;

class Hours extends Component {
  static propTypes = {
    center: PropTypes.object,
    format: PropTypes.oneOf(['24hr', 'ampm']),
    onChange: PropTypes.func,
    onHandMoved: PropTypes.func,
    radius: PropTypes.number,
    selected: PropTypes.number,
    spacing: PropTypes.number,
    theme: PropTypes.object
  };

  state = {
    inner: this.props.format === '24hr' && this.props.selected > 0 && this.props.selected <= 12
  };

  handleHandMove = (degrees, radius) => {
    const currentInner = radius < this.props.radius - this.props.spacing * innerSpacing;
    if (this.props.format === '24hr' && this.state.inner !== currentInner) {
      this.setState({inner: currentInner}, () => {
        this.props.onChange(this.valueFromDegrees(degrees));
      });
    } else {
      this.props.onChange(this.valueFromDegrees(degrees));
    }
  };

  handleMouseDown = (event) => {
    this.refs.hand.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.refs.hand.touchStart(event);
  };

  valueFromDegrees (degrees) {
    if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
      return innerNumbers[degrees / step];
    } else {
      return outerNumbers[degrees / step];
    }
  }

  renderInnerFace (innerRadius) {
    if (this.props.format === '24hr') {
      return (
        <Face
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleMouseDown}
          numbers={innerNumbers}
          spacing={this.props.spacing}
          radius={innerRadius}
          theme={this.props.theme}
          active={this.props.selected}
        />
      );
    }
  }

  render () {
    const { format, selected, radius, spacing, center, onHandMoved } = this.props;
    const is24hr = format === '24hr';

    return (
      <div>
          <Face
            onTouchStart={this.handleTouchStart}
            onMouseDown={this.handleMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)}
            theme={this.props.theme}
          />
          {this.renderInnerFace(radius - spacing * innerSpacing)}
          <Hand ref='hand'
            angle={selected * step}
            length={(this.state.inner ? radius - spacing * innerSpacing : radius) - spacing}
            onMove={this.handleHandMove}
            theme={this.props.theme}
            onMoved={onHandMoved}
            origin={center}
            step={step}
          />
      </div>
    );
  }
}

export default Hours;
