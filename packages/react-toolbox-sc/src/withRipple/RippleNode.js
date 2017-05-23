import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { addOnTransitionEnded, removeOnTransitionEnded } from '../utils/transitions';
import withOverride from '../utils/withOverride';

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
      active,
      idx,          // eslint-disable-line
      innerRef,     // eslint-disable-line
      isTouch,      // eslint-disable-line
      onDeactivate, // eslint-disable-line
      onFinish,     // eslint-disable-line
      spreadSize,
      startX,
      startY,
    } = this.props;
    return (
      <Node
        {...this.props}
        active={active}
        innerRef={this.handleRef}
        spreadSize={spreadSize}
        startX={startX}
        startY={startY}
      />
    );
  }
}

function getEventTypes(isTouch) {
  return isTouch
    ? ['touchend', 'touchmove']
    : ['mouseup'];
}

const scale = keyframes`
  0%   { transform: scale(0); }
  100% { transform: scale(1); }
`;

const Node = styled.span`
  animation: ${scale} 800ms linear;
  background-color: currentColor;
  border-radius: 50%;
  height: ${props => props.spreadSize}px;
  left: ${props => props.startX}px;
  margin-left: -${props => props.spreadSize / 2}px;
  margin-top: -${props => props.spreadSize / 2}px;
  opacity: ${props => (props.active ? 0.3 : 0)};
  outline: none;
  pointer-events: none;
  position: absolute;
  top: ${props => props.startY}px;
  transform: scale(1);
  transition-duration: 800ms;
  transition-property: opacity;
  width: ${props => props.spreadSize}px;
  z-index: 100;
  ${withOverride('RippleNode')}
`;

export default RippleNode;
