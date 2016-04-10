import React from 'react';
import ClassNames from 'classnames';
import ActivableRenderer from '../hoc/ActivableRenderer';
import Overlay from '../overlay';
import style from './style';

const Drawer = (props) => {
  const className = ClassNames([style.root, style[props.type]], {
    [style.active]: props.active
  }, props.className);

  return (
    <Overlay active={props.active} onClick={props.onOverlayClick}>
      <div data-react-toolbox='drawer' className={className}>
        <aside className={style.content}>
          {props.children}
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
  type: React.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left'
};

export default ActivableRenderer()(Drawer);
