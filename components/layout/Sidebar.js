import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

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
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  pinned: React.PropTypes.bool,
  scrollY: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    pinned: React.PropTypes.string.isRequired,
    scrollY: React.PropTypes.string.isRequired,
    sidebar: React.PropTypes.string.isRequired,
    sidebarContent: React.PropTypes.string.isRequired
  }),
  width: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
};

Sidebar.defaultProps = {
  className: '',
  pinned: false,
  scrollY: false,
  width: 5
};

export default themr('ToolboxLayout')(Sidebar);
