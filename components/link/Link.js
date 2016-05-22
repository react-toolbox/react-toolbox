import React from 'react';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { themr } from 'react-css-themr';

const Link = ({active, children, className, count, icon, label, theme, ...others}) => {
  const _className = classnames(theme.link, {
    [theme.active]: active
  }, className);

  return (
    <a data-react-toolbox='link' className={_className} {...others}>
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      {label ? <abbr>{label}</abbr> : null}
      {count && parseInt(count) !== 0 ? <small>{count}</small> : null}
      {children}
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
  label: React.PropTypes.string,
  theme: React.PropTypes.shape({
    active: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  })
};

Link.defaultProps = {
  active: false,
  className: ''
};

export default themr('ToolboxLink')(Link);
