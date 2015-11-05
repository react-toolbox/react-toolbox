import React from 'react';
import Button from '../button';
import style from './style';

const Dialog = (props) => {
  const actions = props.actions.map((action, idx) => {
    let className = style.button;
    if (action.className) className += ` ${action.className}`;
    return <Button key={idx} {...action} className={className} />;
  });

  let className = `${style.root} ${style[props.type]}`;
  if (props.active) className += ` ${style.active}`;
  if (props.className) className += ` ${props.className}`;

  return (
    <div data-react-toolbox='dialog' className={className}>
      <div role='overlay' className={style.overlay} onClick={props.onOverlayClick} />
      <div role='content' className={style.content}>
        <section role='body' className={style.body}>
          { props.title ? <h6 className={style.title}>{props.title}</h6> : null }
          { props.children }
        </section>
        <nav role='navigation' className={style.navigation}>
          { actions }
        </nav>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  actions: React.PropTypes.array,
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};

Dialog.defaultProps = {
  actions: [],
  active: false,
  type: 'normal'
};

export default Dialog;
