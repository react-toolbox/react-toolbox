import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { DIALOG } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectButton from '../button/Button.js';
import InjectOverlay from '../overlay/Overlay.js';

const factory = (Overlay, Button) => {
  const Dialog = (props) => {
    const actions = props.actions.map((action, idx) => {
      const className = classnames(props.theme.button, {[action.className]: action.className});
      return <Button key={idx} {...action} className={className} />;
    });

    const className = classnames([props.theme.dialog, props.theme[props.type]], {
      [props.theme.active]: props.active
    }, props.className);

    const holderClassName = classnames({[props.theme.autoheight]: props.autoHeight}, props.theme.holder);

    //events handler
    const onOverlayClick = (ev) => {
      if (ev.target.getAttribute('data-react-toolbox') === 'dialog-holder'
          && ev.target.getAttribute('data-react-toolbox') !== 'dialog') {
        if (props.onOverlayClick) {
          props.onOverlayClick(ev);
        }
      }
    };

    const onOverlayMouseDown = (ev) => {
      if (ev.target.getAttribute('data-react-toolbox') === 'dialog-holder'
          && ev.target.getAttribute('data-react-toolbox') !== 'dialog') {
        if (props.onOverlayMouseDown) {
          props.onOverlayMouseDown(ev);
        }
      }
    };

    const onOverlayMouseMove = (ev) => {
      if (ev.target.getAttribute('data-react-toolbox') === 'dialog-holder'
          && ev.target.getAttribute('data-react-toolbox') !== 'dialog') {
        if (props.onOverlayMouseMove) {
          props.onOverlayMouseMove(ev);
        }
      }
    };

    const onOverlayMouseUp = (ev) => {
      if (ev.target.getAttribute('data-react-toolbox') === 'dialog-holder'
          && ev.target.getAttribute('data-react-toolbox') !== 'dialog') {
        if (props.onOverlayMouseUp) {
          props.onOverlayMouseUp(ev);
        }
      }
    };

    return (
      <Overlay
        active={props.active}
        onEscKeyDown={props.onEscKeyDown}
      >
      <div
          data-react-toolbox='dialog-holder'
          className={holderClassName}
          onClick={onOverlayClick}
          onMouseDown={onOverlayMouseDown}
          onMouseMove={onOverlayMouseMove}
          onMouseUp={onOverlayMouseUp}
          >
          <div data-react-toolbox='dialog' className={className}>
            <section role='body' className={props.theme.body}>
              {props.title ? <h6 className={props.theme.title}>{props.title}</h6> : null}
              {props.children}
            </section>
            {actions.length
              ? <nav role='navigation' className={props.theme.navigation}>
                  {actions}
                </nav>
              : null
            }
          </div>
        </div>
      </Overlay>
    );
  };

  Dialog.propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    autoHeight: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onEscKeyDown: PropTypes.func,
    onOverlayClick: PropTypes.func,
    onOverlayMouseDown: PropTypes.func,
    onOverlayMouseMove: PropTypes.func,
    onOverlayMouseUp: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      autoheight: PropTypes.string,
      body: PropTypes.string,
      button: PropTypes.string,
      dialog: PropTypes.string,
      holder: PropTypes.string,
      navigation: PropTypes.string,
      title: PropTypes.string
    }),
    title: PropTypes.string,
    type: PropTypes.string
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    autoHeight: false,
    type: 'normal'
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
