import React from 'react';
import autobind from 'autobind-decorator'
import utils from '../../utils';
import style from './style';
import Face from './face';
import Hand from './hand';

const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

@autobind
export default class Minutes extends React.Component {
  static propTypes = {
    selected: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    selected: 0,
    onChange: null
  };

  onHandMove (degrees) {
    this.props.onChange(degrees / step);
  }

  onMouseDown (event) {
    this.refs.hand.mouseStart(event);
  }

  onTouchStart (event) {
    this.refs.hand.touchStart(event);
  }

  render () {
    return (
      <div>
        <Face
          onTouchStart={this.onTouchStart}
          onMouseDown={this.onMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          twoDigits={true}
          active={this.props.selected}
        />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? style.small : ''}
          angle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onMove={this.onHandMove}
          origin={this.props.center}
          step={step}
        />
      </div>
    );
  }
};
