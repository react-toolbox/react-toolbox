import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import style from './style';

class IconButton extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    inverse: React.PropTypes.bool,
    neutral: React.PropTypes.bool,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    primary: React.PropTypes.bool,
    type: React.PropTypes.string
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
    const {accent, children, className, href, icon, inverse, neutral, primary, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const classes = ClassNames([style.toggle], {
      [style[level]]: neutral,
      [style.inverse]: inverse
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
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      children
    );
  }
}

export default Ripple({centered: true})(IconButton);
export { IconButton as RawIconButton };
