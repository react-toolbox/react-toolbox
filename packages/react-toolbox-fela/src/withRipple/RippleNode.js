import React, { Component, PropTypes } from 'react';
import { connect } from 'react-fela';
import { addOnTransitionEnded, removeOnTransitionEnded } from 'react-toolbox-core/lib/utils/onTransitionEnded';

class RippleNode extends Component {
  static propTypes = {
    active: PropTypes.bool,
    idx: PropTypes.string,
    innerRef: PropTypes.func,
    isTouch: PropTypes.bool,
    onDeactivate: PropTypes.func,
    onFinish: PropTypes.func,
    spreadSize: PropTypes.number,
    startX: PropTypes.number,
    startY: PropTypes.number,
  };

  componentWillMount() {
    const { isTouch } = this.props;
    getEventTypes(isTouch).forEach((eventType) => {
      document.addEventListener(eventType, this.handleDeactivate);
    });
  }

  componentDidMount() {
    addOnTransitionEnded(this.rootNode, this.handleOpacityEnd);
  }

  componentWillUnmount() {
    const { isTouch } = this.props;
    getEventTypes(isTouch).forEach((eventType) => {
      document.removeEventListener(eventType, this.handleDeactivate);
    });
  }

  handleDeactivate = () => {
    this.props.onDeactivate(this.props.idx);
  }

  handleOpacityEnd = () => {
    removeOnTransitionEnded(this.rootNode, this.handleOpacityEnd);
    this.props.onFinish(this.props.idx);
  }

  handleRef = (node) => {
    const { innerRef } = this.props;
    this.rootNode = node;
    if (innerRef) innerRef(node);
  };

  render() {
    const {
      active,       // eslint-disable-line
      idx,          // eslint-disable-line
      innerRef,     // eslint-disable-line
      isTouch,      // eslint-disable-line
      onDeactivate, // eslint-disable-line
      onFinish,     // eslint-disable-line
      spreadSize,   // eslint-disable-line
      startX,       // eslint-disable-line
      startY,       // eslint-disable-line
      styles,       // eslint-disable-line
      ...rest,      // eslint-disable-line
    } = this.props;

    return (
      <span
        {...rest}
        className={styles}
        ref={this.handleRef}
      />
    );
  }
}

function getEventTypes(isTouch) {
  return isTouch
    ? ['touchend', 'touchmove']
    : ['mouseup'];
}

const nodeStyles = props => ({
  animation: `${props.animationName} 800ms linear`,
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  height: `${props.spreadSize}px`,
  left: `${props.startX}px`,
  marginLeft: `-${props.spreadSize / 2}px`,
  marginTop: `-${props.spreadSize / 2}px`,
  opacity: props.active ? 0.3 : 0,
  outline: 'none',
  pointerEvents: 'none',
  position: 'absolute',
  top: `${props.startY}px`,
  transform: 'scale(1)',
  transitionDuration: '800ms',
  transitionProperty: 'opacity',
  width: `${props.spreadSize}px`,
  zIndex: 100,
});

const animation = () => ({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});

const mapStylesToProps = props => renderer => renderer.renderRule(nodeStyles, {
  animationName: renderer.renderKeyframe(animation),
  ...props,
});

export default connect(mapStylesToProps)(RippleNode);
