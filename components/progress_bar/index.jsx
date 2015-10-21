import React from 'react';
import autobind from 'autobind-decorator';
import style from './style';
import prefixer from '../utils/prefixer';

@autobind
export default class progressBar extends React.Component {
  static propTypes = {
    buffer: React.PropTypes.number,
    className: React.PropTypes.string,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    mode: React.PropTypes.string,
    multicolor: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.number
  };

  static defaultProps = {
    buffer: 0,
    className: '',
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'linear',
    value: 0
  };

  calculateRatio (value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
    }
  }

  renderCircular () {
    return (
      <svg className={style.circle}>
        <circle className={style.path} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  }

  linearStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    } else {
      return {};
    }
  }

  renderLinear () {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={style.buffer} style={buffer}></span>
        <span ref='value' data-ref='value' className={style.value} style={value}></span>
      </div>
    );
  }

  render () {
    let className = this.props.type === 'linear' ? style.linear : style.circular;
    if (this.props.mode) className += ` ${style[this.props.mode]}`;
    if (this.props.multicolor) className += ` ${style.multicolor}`;
    if (this.props.className) className += ` ${this.props.className}`;

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
}
