/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { DIALOG } from '../identifiers';
import Portal from '../hoc/Portal';
import ActivableRenderer from '../hoc/ActivableRenderer';
import InjectButton from '../button/Button';
import InjectOverlay from '../overlay/Overlay';

const factory = (Overlay, Button) => {
  const Dialog = (props) => {
    const actions = props.actions.map((action, idx) => {
      const className = classnames(props.theme.button, { [action.className]: action.className });
      return <Button key={idx} {...action} className={className} />; // eslint-disable-line
    });

    const className = classnames([props.theme.dialog, props.theme[props.type]], {
      [props.theme.active]: props.active,
    }, props.className);

    return (
      <Portal className={props.theme.wrapper}>
        <Overlay
          active={props.active}
          className={props.theme.overlay}
          onClick={props.onOverlayClick}
          onEscKeyDown={props.onEscKeyDown}
          onMouseDown={props.onOverlayMouseDown}
          onMouseMove={props.onOverlayMouseMove}
          onMouseUp={props.onOverlayMouseUp}
          theme={props.theme}
          themeNamespace="overlay"
        />
        <div data-react-toolbox="dialog" className={className}>
          <section role="body" className={props.theme.body}>
            {props.title ? <h6 className={props.theme.title}>{props.title}</h6> : null}
            {props.children}
          </section>
          {actions.length
            ? <nav className={props.theme.navigation}>
              {actions}
            </nav>
            : null
          }
        </div>
      </Portal>
    );
  };

  Dialog.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      className: PropTypes.string,
      label: PropTypes.string,
      children: PropTypes.node,
    })),
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
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
      overflow: PropTypes.string,
      overlay: PropTypes.string,
      title: PropTypes.string,
      wrapper: PropTypes.string,
    }),
    title: PropTypes.string,
    type: PropTypes.string,
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    type: 'normal',
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
