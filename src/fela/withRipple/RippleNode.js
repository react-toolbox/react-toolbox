import React, { Component } from 'react';
import { createComponent } from 'react-fela';

const RippleNode = createComponent(props => ({
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  left: '50%',
  pointerEvents: 'none',
  position: 'absolute',
  top: '50%',
  transformOrigin: '50% 50%',
  transitionDuration: '800ms',
  zIndex: 100,
  opacity: (props.restarting || props.active) ? 0.3 : 0,
  transitionProperty: !props.restarting
    ? (props.active ? 'transform' : 'opacity, transform')
    : 'none',
}), 'span');

class Foo extends Component {
  render() {
    const { innerRef, ...rest } = this.props;
    return (
      <div ref={innerRef}>
        <RippleNode {...rest} />
      </div>
    );
  }
}

export default Foo;
