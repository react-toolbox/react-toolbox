import React from 'react';
import ClassNames from 'classnames';
import style from './style';
import FontIcon from '../font_icon';

const Link = ({children, ...props}) => {
  const className = ClassNames(style.root, {
    [style.active]: props.active
  }, props.className);

  return (
    <a {...props} data-react-toolbox='link'className={className}>
      {props.icon ? <FontIcon className={style.icon} value={props.icon} /> : null}
      {props.label ? <abbr>{props.label}</abbr> : null}
      {props.count && parseInt(props.count) !== 0 ? <small>{props.count}</small> : null}
      {children ? children : null}
    </a>
  );
};

Link.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  count: React.PropTypes.number,
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  label: React.PropTypes.string
};

Link.defaultProps = {
  active: false,
  className: ''
};

export default Link;
