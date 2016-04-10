import React from 'react';
import classnames from 'classnames';
import style from './style';

const Sidebar = (props) => {
  const wrapperClasses = classnames(style.sidebar, style[`width-${props.width}`], {
    [style.pinned]: props.pinned
  }, props.className);

  const innerClasses = classnames(style.sidebarContent, {
    [style.scrollY]: props.scrollY
  });

  return (
    <div data-react-toolbox='sidebar' className={wrapperClasses}>
      <aside data-react-toolbox='sidebar-content' className={innerClasses}>
        {props.children}
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  pinned: React.PropTypes.bool,
  scrollY: React.PropTypes.bool,
  width: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
};

Sidebar.defaultProps = {
  className: '',
  pinned: false,
  scrollY: false,
  width: 5
};

export default Sidebar;
