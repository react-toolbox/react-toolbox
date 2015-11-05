import React from 'react';
import style from './style';

const Drawer = (props) => {
  let className = `${style.drawer} ${style[props.type]}`;
  if (props.active) className += ` ${style.active}`;
  if (props.className) className += ` ${props.className}`;

  return (
    <div data-react-toolbox='drawer' className={className}>
      <div className={style.overlay} onClick={props.onOverlayClick}></div>
      <aside className={style.content}>
        { props.children }
      </aside>
    </div>
  );
};

Drawer.propTypes = {
  active: React.PropTypes.bool,
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
