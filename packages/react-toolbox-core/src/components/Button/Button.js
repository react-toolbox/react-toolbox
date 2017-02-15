import React, { Component, PropTypes } from 'react';
import getPassThrough from '../../utils/getPassThrough';

const buttonFactory = ({
  ripple,
  ButtonNode,
  LinkNode,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class Button extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      children: PropTypes.node,
      flat: PropTypes.bool,
      floating: PropTypes.bool,
      href: PropTypes.string,
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
      const nodeTag = this.props.href ? 'LinkNode' : 'ButtonNode';
      const ButtonElement = this.props.href ? LinkNode : ButtonNode;
      const { children, primary, flat, label, type, ...others } = this.props;
      const isPrimary = primary || (!others.accent && !others.neutral);
      const isFlat = flat || (!others.raised && !others.floating && !others.toggle);

      return (
        <ButtonElement
          {...others}
          {...passProps(this.props, nodeTag)}
          flat={isFlat}
          primary={isPrimary}
          type={!this.props.href && type}
          innerRef={(node) => { self.rootNode = node; }}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
        >
          {children}
          {label}
        </ButtonElement>
      );
    }
  }

  return ripple(Button);
};

export default buttonFactory;
