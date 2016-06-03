import React, { Component, PropTypes } from 'react';
import utils from '../utils/utils.js';
import Hand from './ClockHand.js';
import Face from './ClockFace.js';

const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

class Minutes extends Component {
  static propTypes = {
    center: PropTypes.object,
    onChange: PropTypes.func,
    radius: PropTypes.number,
    selected: PropTypes.number,
    spacing: PropTypes.number,
    theme: PropTypes.shape({
      small: PropTypes.string
    })
  };

  static defaultProps = {
    selected: 0,
    onChange: null
  };

  handleHandMove = (degrees) => {
    this.props.onChange(degrees / step);
  };

  handleMouseDown = (event) => {
    this.refs.hand.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.refs.hand.touchStart(event);
  };

  render () {
    return (
      <div>
        <Face
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          active={this.props.selected}
          theme={this.props.theme}
          twoDigits
        />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? this.props.theme.small : ''}
          angle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onMove={this.handleHandMove}
          origin={this.props.center}
          theme={this.props.theme}
          step={step}
        />
      </div>
    );
  }
}

export default Minutes;
