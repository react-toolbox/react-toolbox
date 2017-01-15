import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers.js';
import InjectFontIcon from '../font_icon/FontIcon.js';
import rippleFactory from '../ripple/Ripple.js';

const factory = (ripple, FontIcon) => {
  class Button extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      flat: PropTypes.bool,
      floating: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      inverse: PropTypes.bool,
      label: PropTypes.string,
      mini: PropTypes.bool,
      neutral: PropTypes.bool,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      raised: PropTypes.bool,
      theme: PropTypes.shape({
        accent: PropTypes.string,
        button: PropTypes.string,
        flat: PropTypes.string,
        floating: PropTypes.string,
        icon: PropTypes.string,
        inverse: PropTypes.string,
        mini: PropTypes.string,
        neutral: PropTypes.string,
        primary: PropTypes.string,
        raised: PropTypes.string,
        rippleWrapper: PropTypes.string,
        toggle: PropTypes.string
      }),
      type: PropTypes.string
    };

    static defaultProps = {
      accent: false,
      className: '',
      flat: false,
      floating: false,
      mini: false,
      neutral: true,
      primary: false,
      raised: false,
      type: 'button'
    };

    handleMouseUp = (event) => {
      this.refs.button.blur();
      if (this.props.onMouseUp) this.props.onMouseUp(event);
    };

    handleMouseLeave = (event) => {
      this.refs.button.blur();
      if (this.props.onMouseLeave) this.props.onMouseLeave(event);
    };

    render () {
      const { accent, children, className, flat, floating, href, icon,
        inverse, label, mini, neutral, primary, theme, type, raised, ...others} = this.props;
      const element = href ? 'a' : 'button';
      const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
      const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat';

      const classes = classnames(theme.button, [theme[shape]], {
        [theme[level]]: neutral,
        [theme.mini]: mini,
        [theme.inverse]: inverse
      }, className);

      const props = {
        ...others,
        href,
        ref: 'button',
        className: classes,
        disabled: this.props.disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        type: !href ? type : null,
        'data-react-toolbox': 'button'
      };

      return React.createElement(element, props,
        icon ? <FontIcon className={theme.icon} value={icon}/> : null,
        label,
        children
      );
    }
  }

  return ripple(Button);
};

const Button = factory(rippleFactory({ centered: false }), InjectFontIcon);
export default themr(BUTTON)(Button);
export { factory as buttonFactory };
export { Button };
