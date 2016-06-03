import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers.js';

const Sidebar = ({ children, className, pinned, scrollY, theme, width }) => {
  const wrapperClasses = classnames(theme.sidebar, theme[`width-${width}`], {
    [theme.pinned]: pinned
  }, className);

  const innerClasses = classnames(theme.sidebarContent, {
    [theme.scrollY]: scrollY
  });

  return (
    <div data-react-toolbox='sidebar' className={wrapperClasses}>
      <aside data-react-toolbox='sidebar-content' className={innerClasses}>
        {children}
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  pinned: PropTypes.bool,
  scrollY: PropTypes.bool,
  theme: PropTypes.shape({
    pinned: PropTypes.string,
    scrollY: PropTypes.string,
    sidebar: PropTypes.string,
    sidebarContent: PropTypes.string
  }),
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
};

Sidebar.defaultProps = {
  className: '',
  pinned: false,
  scrollY: false,
  width: 5
};

export default themr(LAYOUT)(Sidebar);
export { Sidebar };
