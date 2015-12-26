import React from 'react';
import ReactDOM from 'react-dom';
import RippleComponent from './RippleComponent';

const AddRippleToComponent = (Component, {centered, className, spread}) => {
  return class RippledComponent extends Component {
    static propTypes = {
      ...Component.propTypes,
      disabled: React.PropTypes.bool,
      ripple: React.PropTypes.bool,
      rippleCentered: React.PropTypes.bool,
      rippleClassName: React.PropTypes.string,
      rippleSpread: React.PropTypes.number
    }

    static defaultProps = {
      ...Component.defaultProps,
      ripple: true,
      rippleCentered: centered,
      rippleClassName: className,
      rippleSpread: spread
    }

    _rippleHandleMouseDown = (event) => {
      if (!this.props.disabled) {
        const node = ReactDOM.findDOMNode(this);
        this.refs.ripple.start(node, event);
      }
      if (this.props.onMouseDown) this.props.onMouseDown(event);
    }

    get _rippleComponent () {
      const { rippleClassName, rippleCentered, rippleSpread } = this.props;

      return (
        <RippleComponent {...{rippleClassName, rippleCentered, rippleSpread}} key='ripple_component' ref='ripple' />
      );
    }

    render () {
      const component = super.render();
      if (this.props.ripple === false) return component;

      const children = [...React.Children.toArray(component.props.children), this._rippleComponent];
      const props = {onMouseDown: this._rippleHandleMouseDown};

      return React.cloneElement(component, props, children);
    }
  };
};

export default AddRippleToComponent;
