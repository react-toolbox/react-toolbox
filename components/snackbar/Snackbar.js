import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers';
import ActivableRenderer from '../hoc/ActivableRenderer';
import InjectOverlay from '../overlay/Overlay';
import InjectButton from '../button/Button';

const factory = (Overlay, Button) => {
  class Snackbar extends Component {
    static propTypes = {
      action: PropTypes.string,
      active: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      onClick: PropTypes.func,
      onTimeout: PropTypes.func,
      theme: PropTypes.shape({
        accept: PropTypes.string,
        active: PropTypes.string,
        button: PropTypes.string,
        cancel: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string,
        snackbar: PropTypes.string,
        warning: PropTypes.string,
      }),
      timeout: PropTypes.number,
      type: PropTypes.oneOf(['accept', 'cancel', 'warning']),
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.active && nextProps.timeout) {
        if (this.curTimeout) clearTimeout(this.curTimeout);
        this.curTimeout = setTimeout(() => {
          nextProps.onTimeout();
          this.curTimeout = null;
        }, nextProps.timeout);
      }
    }

    componentWillUnmount() {
      clearTimeout(this.curTimeout);
    }

    render() {
      const { action, active, children, label, onClick, theme, type } = this.props;
      const className = classnames([theme.snackbar, theme[type]], {
        [theme.active]: active,
      }, this.props.className);

      return (
        <Overlay invisible>
          <div data-react-toolbox="snackbar" className={className}>
            <span className={theme.label}>
              {label}
              {children}
            </span>
            {action && <Button className={theme.button} label={action} onClick={onClick} />}
          </div>
        </Overlay>
      );
    }
  }

  return ActivableRenderer()(Snackbar);
};

const Snackbar = factory(InjectOverlay, InjectButton);
export default themr(SNACKBAR)(Snackbar);
export { factory as snackbarFactory };
export { Snackbar };
