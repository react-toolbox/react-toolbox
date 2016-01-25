import React from 'react';
import ClassNames from 'classnames';
import Overlay from '../overlay';
import style from './style';

const Drawer = (props) => {
  const className = ClassNames([style.root, style[props.type]], props.className);

  return (
    <Overlay
      active={props.active}
      onClick={props.onOverlayClick}
      animationDuration={props.animationDuration + props.animationDelay}
      >
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
  animationDelay: React.PropTypes.number,
  animationDuration: React.PropTypes.number,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  type: React.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  animationDelay: 350 / 5,
  animationDuration: 350,
  className: '',
  type: 'left'
};

export default Drawer;
