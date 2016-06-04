import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { DRAWER } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectOverlay from '../overlay/Overlay.js';

const factory = (Overlay) => {
  const Drawer = ({ active, children, className, onOverlayClick, theme, type }) => {
    const _className = classnames([theme.drawer, theme[type]], {
      [theme.active]: active
    }, className);

    return (
      <Overlay active={active} onClick={onOverlayClick}>
        <div data-react-toolbox='drawer' className={_className}>
          <aside className={theme.content}>
            {children}
          </aside>
        </div>
      </Overlay>
    );
  };

  Drawer.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onOverlayClick: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      content: PropTypes.string,
      drawer: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string
    }),
    type: PropTypes.oneOf(['left', 'right'])
  };

  Drawer.defaultProps = {
    active: false,
    className: '',
    type: 'left'
  };

  return ActivableRenderer()(Drawer);
};

const Drawer = factory(InjectOverlay);
export default themr(DRAWER)(Drawer);
export { factory as drawerFactory };
export { Drawer };
