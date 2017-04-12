import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers';

const Panel = ({ bodyScroll, children, className, theme, ...other }) => {
  const _className = cn(theme.panel, { [theme.bodyScroll]: bodyScroll }, className);
  return (
    <div {...other} data-react-toolbox="panel" className={_className}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  bodyScroll: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.shape({
    panel: PropTypes.string,
  }),
};

Panel.defaultProps = {
  bodyScroll: true,
  className: '',
};

export default themr(LAYOUT)(Panel);
export { Panel };
