import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers.js';

const NavDrawer = ({ active, children, className, onOverlayClick, permanentAt, pinned, scrollY, theme, width }) => {
  const rootClasses = classnames([theme.navDrawer], {
    [theme[permanentAt + 'Permanent']]: permanentAt,
    [theme.wide]: (width === 'wide'),
    [theme.active]: active,
    [theme.pinned]: pinned
  }, className);

  const drawerClasses = classnames(theme.drawerContent, {
      [theme.scrollY]: scrollY
  });

  return (
    <div data-react-toolbox='nav-drawer' className={rootClasses} onClick={onOverlayClick}>
      <div data-react-toolbox='nav-drawer-scrim' className={theme.scrim}>
        <aside data-react-toolbox='nav-drawer-content' className={drawerClasses}>
          {children}
        </aside>
      </div>
    </div>
  );
};

NavDrawer.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  onOverlayClick: PropTypes.func,
  permanentAt: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
  pinned: PropTypes.bool,
  scrollY: PropTypes.bool,
  theme: PropTypes.shape({
    active: PropTypes.string,
    drawerContent: PropTypes.string,
    lgPermanent: PropTypes.string,
    mdPermanent: PropTypes.string,
    navDrawer: PropTypes.string,
    pinned: PropTypes.string,
    scrim: PropTypes.string,
    scrollY: PropTypes.string,
    smPermanent: PropTypes.string,
    wide: PropTypes.string,
    xlPermanent: PropTypes.string,
    xxlPermanent: PropTypes.string,
    xxxlPermanent: PropTypes.string
  }),
  width: PropTypes.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
  active: false,
  className: '',
  scrollY: false,
  width: 'normal'
};

export default themr(LAYOUT)(NavDrawer);
export { NavDrawer };
