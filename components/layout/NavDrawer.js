import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import InjectDrawer from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';

const factory = (Drawer) => {
  const NavDrawer = ({
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
        themeNamespace="navDrawer"
        withOverlay={!pinned}
      />
    );
  };

  NavDrawer.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    clipped: PropTypes.bool,
    permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
    pinned: PropTypes.bool,
    right: PropTypes.bool,
    theme: PropTypes.shape({
      clipped: PropTypes.string,
      pinned: PropTypes.string,
    }),
  };

  NavDrawer.defaultProps = {
    className: '',
    pinned: false,
  };

  return NavDrawer;
};

const NavDrawer = factory(InjectDrawer);
export default themr(LAYOUT)(NavDrawer);
export { factory as navDrawerFactory };
export { NavDrawer };
