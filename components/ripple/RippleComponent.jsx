import React from 'react';
import ClassNames from 'classnames';
import style from './style';
import prefixer from '../utils/prefixer';

class RippleComponent extends React.Component {
  static propTypes = {
    rippleCentered: React.PropTypes.bool,
    rippleClassName: React.PropTypes.string,
    rippleSpread: React.PropTypes.number
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

  start = (node, {pageX, pageY, touch = false}) => {
    if (!this._isTouchRippleReceivingMouseEvent(touch)) {
      this.touch = touch;
      document.addEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
      const {top, left, width} = this._getDescriptor(node, pageX, pageY);
      this.setState({active: false, restarting: true, top, left, width}, () => {
        this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions
        this.setState({active: true, restarting: false});
      });
    }
  };

  _isTouchRippleReceivingMouseEvent (touch) {
    return this.touch && !touch;
  }

  _getDescriptor (node, pageX, pageY) {
    const {left, top, height, width} = node.getBoundingClientRect();
    const {rippleCentered: centered, rippleSpread: spread} = this.props;

    return {
      left: centered ? 0 : pageX - left - width / 2 - window.scrollX,
      top: centered ? 0 : pageY - top - height / 2 - window.scrollY,
      width: width * spread
    };
  }

  render () {
    const rippleClassName = ClassNames(style.normal, {
      [style.active]: this.state.active,
      [style.restarting]: this.state.restarting
    }, this.props.rippleClassName);

    const { left, top, width } = this.state;
    const scale = this.state.restarting ? 0 : 1;
    const rippleStyle = prefixer({
      transform: `translate3d(${-width / 2 + left}px, ${-width / 2 + top}px, 0) scale(${scale})`
    }, {width, height: width});

    return (
      <span data-react-toolbox='ripple' className={style.wrapper}>
        <span ref='ripple' role='ripple' className={rippleClassName} style={rippleStyle} />
      </span>
    );
  }
}

export default RippleComponent;

