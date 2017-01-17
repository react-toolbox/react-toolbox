import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import Portal from '../hoc/Portal.js';
import { DRAWER } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectOverlay from '../overlay/Overlay.js';

const factory = (Overlay) => {
  const Drawer = ({
    active,
    children,
    className,
    insideTree,
    onOverlayClick,
    onEscKeyDown,
    theme,
    type,
    withOverlay
  }) => {
    const _className = classnames([theme.drawer, theme[type]], {
      [theme.active]: active
    }, className);

    const content = (
      <aside
        data-react-toolbox='drawer'
        className={_className}
        children={children}
      />
    );

    return React.createElement(insideTree ? 'div' : Portal, {
      className: theme.wrapper,
      children: [
        withOverlay && (
          <Overlay
            active={active}
            onClick={onOverlayClick}
            onEscKeyDown={onEscKeyDown}
            theme={theme}
            themeNamespace="overlay"
          />
        ),
        content
      ]
    });
  };

  Drawer.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    insideTree: PropTypes.bool,
    onOverlayClick: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      drawer: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string
    }),
    type: PropTypes.oneOf([
      'left', 'right'
    ]),
    withOverlay: PropTypes.bool
  };

  Drawer.defaultProps = {
    active: false,
    className: '',
    insideTree: false,
    type: 'left',
    withOverlay: true
  };

  return ActivableRenderer()(Drawer);
};

const Drawer = factory(InjectOverlay);
export default themr(DRAWER)(Drawer);
export { factory as drawerFactory };
export { Drawer };
