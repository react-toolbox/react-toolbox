import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import RippleDecorator from '../ripple/RippleDecorator';
import style from './style';

class IconButton extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    primary: false
  };

  handleMouseUp = () => {
    this.refs.button.blur();
  };

  render () {
    const {accent, children, className, href, icon, inverse, primary, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const classes = ClassNames([style.toggle, style[level]], {[style.inverse]: inverse}, className);

    const props = {
      ...others,
      href,
      ref: 'button',
      className: classes,
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      'data-react-toolbox': 'button'
    };

    return React.createElement(element, props,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      children
    );
  }
}

export default RippleDecorator({centered: true})(IconButton);
