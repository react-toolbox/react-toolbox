import React from 'react';
import style from './style';
import FontIcon from '../font_icon';

const Link = props => {
  let className = style.root;
  if (props.className) className += ` ${props.className}`;
  return (
    <a
      {...props}
      data-react-toolbox='link'
      href={props.route}
      className={className}
    >
      { props.icon ? <FontIcon className={style.icon} value={props.icon} /> : null }
      { props.label ? <abbr>{props.label}</abbr> : null }
      { props.count && parseInt(props.count) !== 0 ? <small>{props.count}</small> : null}
    </a>
  );
};

Link.propTypes = {
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  count: React.PropTypes.number,
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func,
  route: React.PropTypes.string
};

Link.defaultProps = {
  attributes: '',
  className: ''
};
