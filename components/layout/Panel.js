import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers.js';

const Panel = ({ bodyScroll, children, className, theme, ...other }) => (
  <div
    {...other}
    data-react-toolbox='panel'
    className={classnames(theme.panel, {
      [theme.bodyScroll]: bodyScroll
    }, className)}
    children={children}
  />
);

Panel.propTypes = {
  bodyScroll: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  theme: PropTypes.shape({
    panel: PropTypes.string
  })
};

Panel.defaultProps = {
  bodyScroll: true,
  className: ''
};

export default themr(LAYOUT)(Panel);
export { Panel };
