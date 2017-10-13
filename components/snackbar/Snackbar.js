import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectOverlay from '../overlay/Overlay.js';
import InjectButton from '../button/Button.js';

const factory = (Overlay, Button) => {
  class Snackbar extends Component {
    static propTypes = {
      action: PropTypes.string,
      active: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      onClick: PropTypes.func,
      onTimeout: PropTypes.func,
      theme: PropTypes.shape({
        accept: PropTypes.string,
        active: PropTypes.string,
        button: PropTypes.string,
        cancel: PropTypes.string,
        label: PropTypes.string,
        snackbar: PropTypes.string,
        warning: PropTypes.string
      }),
      timeout: PropTypes.number,
      type: PropTypes.oneOf([ 'accept', 'cancel', 'warning' ])
    };

    componentDidMount () {
      if (this.props.active && this.props.timeout) {
        this.scheduleTimeout(this.props);
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.active && nextProps.timeout) {
        this.scheduleTimeout(nextProps);
      }
    }

    componentWillUnmount () {
      clearTimeout(this.curTimeout);
    }

    scheduleTimeout = props => {
      const { onTimeout, timeout } = props;
      if (this.curTimeout) clearTimeout(this.curTimeout);
      this.curTimeout = setTimeout(() => {
        if (onTimeout) onTimeout();
        this.curTimeout = null;
      }, timeout);
    }

    render () {
      const {action, active, children, label, onClick, theme, type } = this.props;
      const className = classnames([theme.snackbar, theme[type]], {
        [theme.active]: active
      }, this.props.className);

      return (
        <Overlay invisible>
          <div data-react-toolbox='snackbar' className={className}>
            <span className={theme.label}>
              {label}
              {children}
            </span>
            {action ? <Button className={theme.button} label={action} onClick={onClick}/> : null}
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
