import React from 'react';
import ClassNames from 'classnames';
import Button from '../button';
import Overlay from '../overlay';
import style from './style.scss';

const Dialog = (props) => {
  const actions = props.actions.map((action, idx) => {
    const className = ClassNames(style.button, {[action.className]: action.className});
    return <Button key={idx} {...action} className={className} />;
  });

  const className = ClassNames([ style.root, style[props.type] ], {
    [style.active]: props.active
  }, props.className);
  const classNameNavigation = ClassNames([style.navigation], style[props.actionsPosition]);
  return (
    <Overlay active={props.active} onClick={props.onOverlayClick}>
      <div data-react-toolbox='dialog' className={className}>
        <section role='body' className={style.body}>
          {props.title ? <h6 className={style.title}>{props.title}</h6> : null}
          {props.children}
        </section>
        <nav role='navigation' className={classNameNavigation}>
          {actions}
        </nav>
      </div>
    </Overlay>
  );
};

Dialog.propTypes = {
  actions: React.PropTypes.array,
  actionsPosition: React.PropTypes.oneOf(['left', 'center', 'right']),
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};

Dialog.defaultProps = {
  actions: [],
  actionsPosition: 'right',
  active: false,
  type: 'normal'
};

export default Dialog;
