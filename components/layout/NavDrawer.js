import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

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
  active: React.PropTypes.bool,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  permanentAt: React.PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
  pinned: React.PropTypes.bool,
  scrollY: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    active: React.PropTypes.string.isRequired,
    drawerContent: React.PropTypes.string.isRequired,
    lgPermanent: React.PropTypes.string.isRequired,
    mdPermanent: React.PropTypes.string.isRequired,
    navDrawer: React.PropTypes.string.isRequired,
    pinned: React.PropTypes.string.isRequired,
    scrim: React.PropTypes.string.isRequired,
    scrollY: React.PropTypes.string.isRequired,
    smPermanent: React.PropTypes.string.isRequired,
    wide: React.PropTypes.string.isRequired,
    xlPermanent: React.PropTypes.string.isRequired,
    xxlPermanent: React.PropTypes.string.isRequired,
    xxxlPermanent: React.PropTypes.string.isRequired
  }),
  width: React.PropTypes.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
  active: false,
  className: '',
  scrollY: false,
  width: 'normal'
};

export default themr('ToolboxLayout')(NavDrawer);
