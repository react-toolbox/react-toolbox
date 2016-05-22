import React from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import ActivableRenderer from '../hoc/ActivableRenderer';
import Overlay from '../overlay';

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
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  theme: React.PropTypes.shape({
    active: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    drawer: React.PropTypes.string.isRequired,
    left: React.PropTypes.string.isRequired,
    right: React.PropTypes.string.isRequired
  }),
  type: React.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left'
};

export default themr('ToolboxDrawer')(ActivableRenderer()(Drawer));
