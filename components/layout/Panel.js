import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers.js';

const Panel = ({ children, className, scrollY, theme }) => {
  const _className = classnames(theme.panel, {
    [theme.scrollY]: scrollY
  }, className);

  return (
    <div data-react-toolbox='panel' className={_className}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  scrollY: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    panel: React.PropTypes.string.isRequired,
    scrollY: React.PropTypes.string.isRequired
  })
};

Panel.defaultProps = {
  className: '',
  scrollY: false
};

export default themr(LAYOUT)(Panel);
export { Panel };
