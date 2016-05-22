import React from 'react';
import utils from '../utils/utils';
import Face from './ClockFace';
import Hand from './ClockHand';

const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

class Minutes extends React.Component {
  static propTypes = {
    center: React.PropTypes.object,
    onChange: React.PropTypes.func,
    radius: React.PropTypes.number,
    selected: React.PropTypes.number,
    spacing: React.PropTypes.number,
    theme: React.PropTypes.shape({
      small: React.PropTypes.string.isRequired
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
