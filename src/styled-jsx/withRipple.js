import React from 'react';
import cn from 'classnames';
import withRippleFactory from '../core/withRipple/withRipple';

class RippleNode extends React.Component {
  render() {
    const { props } = this;
    const { active, restarting, innerRef, ...other } = props;
    const className = cn({
      active: props.active && !props.restarting,
      restarting: !props.active && props.restarting,
    });

    return (
      <span className={className} ref={props.innerRef} {...other}>
        {props.children}
        <style jsx>{`
            span {
              background-color: currentColor;
              border-radius: 50%;
              left: 50%;
              opacity: 0;
              pointer-events: none;
              position: absolute;
              top: 50%;
              transition-property: opacity, transform;
              transform-origin: 50% 50%;
              transition-duration: 800ms;
              z-index: 100;
            }
            span.active {
              opacity: 0.3;
              transition-property: transform;
            }
            span.restarting {
              opacity: 0.3;
              transition-property: none;
            }
        `}</style>
      </span>
    );
  }
}

class RippleWrapper extends React.Component {
  render() {
    const { props } = this;
    const { innerRef, ...other } = props;
    return (
      <span ref={props.innerRef} {...other}>
        {props.children}
        <style jsx>{`
            span {
              bottom: 0;
              display: block;
              left: 0;
              pointer-events: none;
              position: absolute;
              right: 0;
              top: 0;
              z-index: 1;
            }
        `}</style>
      </span>
    );
  }
}

const withRipple = withRippleFactory({ RippleNode, RippleWrapper });
export default withRipple;
