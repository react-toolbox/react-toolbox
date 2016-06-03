import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers.js';
import InjectFontIcon from '../font_icon/FontIcon.js';
import rippleFactory from '../ripple/Ripple.js';

const factory = (ripple, FontIcon) => {
  class IconButton extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      inverse: PropTypes.bool,
      neutral: PropTypes.bool,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      theme: PropTypes.object,
      type: PropTypes.string
    };

    static defaultProps = {
      accent: false,
      className: '',
      neutral: true,
      primary: false
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
      const {accent, children, className, href, icon, inverse, neutral,
        primary, theme, ...others} = this.props;
      const element = href ? 'a' : 'button';
      const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
      const classes = classnames([theme.toggle], {
        [theme[level]]: neutral,
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
        'data-react-toolbox': 'button'
      };

      return React.createElement(element, props,
        icon ? <FontIcon className={theme.icon} value={icon}/> : null,
        children
      );
    }
  }

  return ripple(IconButton);
};

const IconButton = factory(rippleFactory({centered: true}), InjectFontIcon);
export default themr(BUTTON)(IconButton);
export { factory as iconButtonFactory };
export { IconButton };
