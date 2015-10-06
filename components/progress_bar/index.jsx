/* global React */

import { addons } from 'react/addons';
import css from './style';
import prefixer from '../utils/prefixer';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    buffer: React.PropTypes.number,
    className: React.PropTypes.string,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    mode: React.PropTypes.string,
    multicolor: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      buffer: 0,
      className: '',
      max: 100,
      min: 0,
      mode: 'indeterminate',
      multicolor: false,
      type: 'linear',
      value: 0
    };
  },

  calculateRatio (value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  },

  circularStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
    }
  },

  renderCircular () {
    return (
      <svg className={css.circle}>
        <circle className={css.circlePath} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  },

  linearStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    } else {
      return {};
    }
  },

  renderLinear () {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={css.bufferBar} style={buffer}></span>
        <span ref='value' data-ref='value' className={css.valueBar} style={value}></span>
      </div>
    );
  },

  render () {
    let className = this.props.type === 'linear' ? css.linearBar : css.circularBar;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.mode) className += ` ${this.props.mode}`;
    if (this.props.multicolor) className += ` multicolor`;

    return (
      <div
        data-react-toolbox='progress-bar'
        className={className}
        aria-valuenow={this.props.value}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}
      >
        { this.props.type === 'circular' ? this.renderCircular() : this.renderLinear() }
      </div>
    );
  }
});
