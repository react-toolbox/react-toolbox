import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { LAYOUT } from '../identifiers.js';

const Layout = ({ className, children, theme }) => (
  <div data-react-toolbox='layout' className={classnames(theme.layout, className)}>
    {React.Children.map(children, (child) => React.cloneElement(child, { theme }))}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  className: PropTypes.string,
  theme: PropTypes.shape({
    layout: PropTypes.string
  })
};

Layout.defaultProps = {
  className: ''
};

export default themr(LAYOUT)(Layout);
export { Layout };
