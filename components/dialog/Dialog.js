import PropTypes from 'prop-types';
import React from 'react';
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

    const bodyClassName = props.disableScrolling ? props.theme.body : classnames(props.theme.body, props.theme.scroll);

    return (
      <Overlay
        active={props.active}
        onClick={props.onOverlayClick}
        onEscKeyDown={props.onEscKeyDown}
        onMouseDown={props.onOverlayMouseDown}
        onMouseMove={props.onOverlayMouseMove}
        onMouseUp={props.onOverlayMouseUp}
      >
        <div data-react-toolbox='dialog' className={className}>
          <section role='body' className={bodyClassName}>
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
      </Overlay>
    );
  };

  Dialog.propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disableScrolling: PropTypes.bool,
    onEscKeyDown: PropTypes.func,
    onOverlayClick: PropTypes.func,
    onOverlayMouseDown: PropTypes.func,
    onOverlayMouseMove: PropTypes.func,
    onOverlayMouseUp: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      body: PropTypes.string,
      button: PropTypes.string,
      dialog: PropTypes.string,
      navigation: PropTypes.string,
      scroll: PropTypes.string,
      title: PropTypes.string
    }),
    title: PropTypes.string,
    type: PropTypes.string
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    disableScrolling: false,
    type: 'normal'
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
