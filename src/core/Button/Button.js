import React, { Component, PropTypes } from 'react';
import { merge } from 'ramda';

const buttonFactory = ({
  ripple,
  ButtonNode,
  FontIcon,
  LinkNode,
}) => {
  class Button extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      children: PropTypes.node,
      flat: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      label: PropTypes.string,
      mini: PropTypes.bool,
      neutral: PropTypes.bool,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      raised: PropTypes.bool,
      type: PropTypes.string,
    }

    static defaultProps = {
      accent: false,
      flat: false,
      floating: false,
      mini: false,
      neutral: true,
      primary: false,
      raised: false,
      type: 'button',
    };

    handleMouseUp = (event) => {
      this.rootNode.blur();
      if (this.props.onMouseUp) {
        this.props.onMouseUp(event);
      }
    };

    handleMouseLeave = (event) => {
      this.rootNode.blur();
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(event);
      }
    };

    render() {
      const self = this;
      const ButtonElement = this.props.href ? LinkNode : ButtonNode;
      const { children, icon, label, ...others } = this.props;
      const parsed = merge(others, {
        primary: others.primary || (!others.accent && !others.neutral),
        flat: others.flat || (!others.raised && !others.floating && !others.toggle),
      });

      return (
        <ButtonElement
          {...parsed}
          innerRef={(node) => { self.rootNode = node; }}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
        >
          {icon && <FontIcon value={icon} />}
          {label}
          {children}
        </ButtonElement>
      );
    }
  }

  return ripple(Button);
};

export default buttonFactory;
