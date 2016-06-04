import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Face extends Component {
  static propTypes = {
    active: PropTypes.number,
    numbers: PropTypes.array,
    radius: PropTypes.number,
    spacing: PropTypes.number,
    theme: PropTypes.shape({
      active: PropTypes.string,
      face: PropTypes.string,
      number: PropTypes.string
    }),
    twoDigits: PropTypes.bool
  };

  static defaultProps = {
    active: null,
    numbers: [],
    radius: 0,
    twoDigits: false
  };

  numberStyle (rad, num) {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  }

  faceStyle () {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2
    };
  }

  renderNumber (number, idx) {
    const { active, radius, spacing, theme, twoDigits } = this.props;
    return (
      <span
        className={classnames(theme.number, {[theme.active]: number === active})}
        style={this.numberStyle(radius - spacing, idx + 1)}
        key={number}
      >
        {twoDigits ? ('0' + number).slice(-2) : number}
      </span>
    );
  }

  render () {
    const { numbers, onTouchStart, onMouseDown, theme } = this.props;
    return (
      <div
        ref='root'
        className={theme.face}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        style={this.faceStyle()}
      >
        {numbers.map(this.renderNumber.bind(this))}
      </div>
    );
  }
}

export default Face;
