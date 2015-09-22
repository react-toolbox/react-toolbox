/* global React */

import { addons } from 'react/addons';
import css from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Face',

  getDefaultProps () {
    return {
      active: null,
      numbers: [],
      radius: 0,
      twoDigits: false
    };
  },

  numberStyle (rad, num) {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  },

  faceStyle () {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2
    };
  },

  renderNumber (number, idx) {
    return (
      <span className={css.number + (number === this.props.active ? ' active' : '')}
            style={this.numberStyle(this.props.radius - this.props.spacing, idx + 1)}
            key={number}>
        { this.props.twoDigits ? ('0' + number).slice(-2) : number }
      </span>
    );
  },

  render () {
    return (
      <div ref="root"
           className={css.face}
           onTouchStart={this.props.onTouchStart}
           onMouseDown={this.props.onMouseDown}
           style={this.faceStyle()}>
        { this.props.numbers.map(this.renderNumber)}
      </div>
    );
  }
});
