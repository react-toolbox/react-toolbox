import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator'
import style from './style.scss';

@autobind
export default class Ripple extends React.Component {
  static propTypes = {
    centered: React.PropTypes.bool,
    className: React.PropTypes.string,
    loading: React.PropTypes.bool,
    spread: React.PropTypes.number
  };

  static defaultProps = {
    centered: false,
    className: '',
    loading: false,
    spread: 2
  };

  state = {
    active: false,
    restarting: false,
    top: null,
    left: null,
    width: null
  };

  start ({ pageX, pageY }) {
    document.addEventListener('mouseup', this.end);
    const {top, left, width} = this._getDescriptor(pageX, pageY);
    this.setState({active: false, restarting: true, width: 0}, () => {
      this.refs.ripple.offsetWidth; //eslint-disable-line no-unused-expressions
      this.setState({active: true, restarting: false, top: top, left: left, width: width});
    });
  }

  end () {
    document.removeEventListener('mouseup', this.end);
    this.setState({active: false});
  }

  _getDescriptor (pageX, pageY) {
    let { left, top, height, width } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return {
      left: this.props.centered ? width / 2 : pageX - left,
      top: this.props.centered ? height / 2 : pageY - top,
      width: width * this.props.spread
    };
  }

  render () {
    let { left, top, width } = this.state;
    let rippleStyle = {left: left, top: top, width: width, height: width};
    let className = style[this.props.loading ? 'loading' : 'normal'];
    if (this.state.active) className += ` ${style.active}`;
    if (this.state.restarting) className += ` ${style.restarting}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <span data-react-toolbox='ripple' className={style.wrapper}>
        <span ref="ripple" role='ripple' className={className} style={rippleStyle} />
      </span>
    );
  }
};
