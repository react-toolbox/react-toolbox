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

    return (
      <Overlay
        active={props.active}
        onClick={props.onOverlayClick}
        onMouseDown={props.onOverlayMouseDown}
        onMouseUp={props.onOverlayMouseUp}
        onMouseMove={props.onOverlayMouseMove}
        onEscKeyDown={props.onEscKeyDown}
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
      </Overlay>
    );
  };

  Dialog.propTypes = {
    actions: React.PropTypes.array,
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onEscKeyDown: React.PropTypes.func,
    onOverlayClick: React.PropTypes.func,
    onOverlayMouseDown: React.PropTypes.func,
    onOverlayMouseMove: React.PropTypes.func,
    onOverlayMouseUp: React.PropTypes.func,
    theme: React.PropTypes.shape({
      active: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      button: React.PropTypes.string.isRequired,
      dialog: React.PropTypes.string.isRequired,
      navigation: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    }),
    title: React.PropTypes.string,
    type: React.PropTypes.string
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    type: 'normal'
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
