import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import prefixer from '../utils/prefixer';

class ProgressBar extends React.Component {
  static propTypes = {
    buffer: React.PropTypes.number,
    className: React.PropTypes.string,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    multicolor: React.PropTypes.bool,
    theme: React.PropTypes.shape({
      buffer: React.PropTypes.string.isRequired,
      circle: React.PropTypes.string.isRequired,
      circular: React.PropTypes.string.isRequired,
      indeterminate: React.PropTypes.string.isRequired,
      linear: React.PropTypes.string.isRequired,
      multicolor: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    }),
    type: React.PropTypes.oneOf(['linear', 'circular']),
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

  renderCircular () {
    return (
      <svg className={this.props.theme.circle}>
        <circle className={this.props.theme.path} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  }

  renderLinear () {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={this.props.theme.buffer} style={buffer}></span>
        <span ref='value' data-ref='value' className={this.props.theme.value} style={value}></span>
      </div>
    );
  }

  render () {
    const { className, max, min, mode, multicolor, type, theme, value } = this.props;
    const _className = classnames(theme[type], {
      [theme[mode]]: mode,
      [theme.multicolor]: multicolor
    }, className);

    return (
      <div
        data-react-toolbox='progress-bar'
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={_className}
      >
        {type === 'circular' ? this.renderCircular() : this.renderLinear()}
      </div>
    );
  }
}

export default themr('ToolboxProgress')(ProgressBar);
