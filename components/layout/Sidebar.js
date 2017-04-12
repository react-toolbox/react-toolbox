import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import InjectDrawer from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';

const factory = (Drawer) => {
  const Sidebar = ({
    active,
    className,
    clipped,
    permanentAt, // eslint-disable-line
    pinned,
    theme,
    ...rest
  }) => {
    const _className = classnames({
      [theme.pinned]: pinned,
      [theme.clipped]: clipped,
    }, className);

    return (
      <Drawer
        {...rest}
        active={active || pinned}
        className={_className}
        insideTree
        theme={theme}
        themeNamespace="sidebar"
        type="right"
        withOverlay={!pinned}
      />
    );
  };

  Sidebar.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    clipped: PropTypes.bool,
    permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
    pinned: PropTypes.bool,
    theme: PropTypes.shape({
      clipped: PropTypes.string,
      pinned: PropTypes.string,
    }),
    width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100]),
  };

  Sidebar.defaultProps = {
    className: '',
    pinned: false,
    right: false,
  };

  return Sidebar;
};

const Sidebar = factory(InjectDrawer);
export default themr(LAYOUT)(Sidebar);
export { factory as sidebarFactory };
export { Sidebar };
