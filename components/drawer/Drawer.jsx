import React from 'react';
import Overlay from '../overlay';
import style from './style';

const Drawer = (props) => {
  let className = `${style.root} ${style[props.type]}`;
  if (props.active) className += ` ${style.active}`;
  if (props.className) className += ` ${props.className}`;

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

export default Drawer;
