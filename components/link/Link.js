import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LINK } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

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
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  label: PropTypes.string,
  theme: PropTypes.shape({
    active: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string
  })
};

Link.defaultProps = {
  active: false,
  className: ''
};

export default themr(LINK)(Link);
export { Link };
