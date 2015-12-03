import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import prefixer from '../utils/prefixer';
import style from './style';

class Ripple extends React.Component {
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
    left: null,
    restarting: false,
    top: null,
    width: null
  };

  handleEnd = () => {
    document.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
    this.setState({active: false});
  };

  start = ({pageX, pageY}, touch = false) => {
    if (!this._isTouchRippleReceivingMouseEvent(touch)) {
      this.touch = touch;
      document.addEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
      const {top, left, width} = this._getDescriptor(pageX, pageY);
      this.setState({active: false, restarting: true, top, left, width}, () => {
        this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions
        this.setState({active: true, restarting: false});
      });
    }
  };

  _isTouchRippleReceivingMouseEvent (touch) {
    return this.touch && !touch;
  }

  _getDescriptor (pageX, pageY) {
    const {left, top, height, width} = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return {
      left: this.props.centered ? 0 : pageX - left - width / 2 - window.scrollX,
      top: this.props.centered ? 0 : pageY - top - height / 2 - window.scrollY,
      width: width * this.props.spread
    };
  }

  render () {
    const { left, top, width } = this.state;
    const scale = this.state.restarting ? 0 : 1;
    let rippleStyle = {width, height: width};

    if (!this.props.loading) {
      rippleStyle = prefixer({
        transform: `translate3d(${-width / 2 + left}px, ${-width / 2 + top}px, 0) scale(${scale})`
      }, rippleStyle);
    }

    const className = ClassNames(style[this.props.loading ? 'loading' : 'normal'], {
      [style.active]: this.state.active,
      [style.restarting]: this.state.restarting
    }, this.props.className);

    return (
      <span data-react-toolbox='ripple' className={style.wrapper}>
        <span ref='ripple' role='ripple' className={className} style={rippleStyle} />
      </span>
    );
  }
}

export default Ripple;
