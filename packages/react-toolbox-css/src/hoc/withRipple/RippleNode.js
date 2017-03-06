import React, { Component, PropTypes } from 'react';
import { addOnTransitionEnded, removeOnTransitionEnded } from 'react-toolbox-core/lib/utils/onTransitionEnded';
import createComponent from '../../utils/createComponent';
import theme from './withRipple.css';

const RippleNodeComponent = createComponent('span', {
  name: 'rippleNode',
  modifiers: ['active'],
  theme,
});

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

    const style = {
      height: `${spreadSize}px`,
      left: `${startX}px`,
      marginLeft: `-${spreadSize / 2}px`,
      marginTop: `-${spreadSize / 2}px`,
      top: `${startY}px`,
      width: `${spreadSize}px`,
    };

    return (
      <RippleNodeComponent
        {...rest}
        active={active}
        className={styles}
        innerRef={this.handleRef}
        style={style}
      />
    );
  }
}

function getEventTypes(isTouch) {
  return isTouch
    ? ['touchend', 'touchmove']
    : ['mouseup'];
}

export default RippleNode;
