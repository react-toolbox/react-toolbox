import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import FontIcon from '../font_icon/FontIcon.js';
import InjectOverlay from '../overlay/Overlay.js';
import InjectButton from '../button/Button.js';

const factory = (Overlay, Button) => {
  class Snackbar extends Component {
    static propTypes = {
      action: PropTypes.string,
      active: PropTypes.bool,
      className: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      label: PropTypes.string,
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
        warning: PropTypes.string
      }),
      timeout: PropTypes.number,
      type: PropTypes.oneOf([ 'accept', 'cancel', 'warning' ])
    };

    componentWillReceiveProps (nextProps) {
      if (nextProps.active && nextProps.timeout) {
        if (this.curTimeout) clearTimeout(this.curTimeout);
        this.curTimeout = setTimeout(() => {
          nextProps.onTimeout();
          this.curTimeout = null;
        }, nextProps.timeout);
      }
    }

    componentWillUnmount () {
      clearTimeout(this.curTimeout);
    }

    render () {
      const {action, active, icon, label, onClick, theme, type } = this.props;
      const className = classnames([theme.snackbar, theme[type]], {
        [theme.active]: active
      }, this.props.className);

      return (
        <Overlay invisible>
          <div data-react-toolbox='snackbar' className={className}>
            {icon ? <FontIcon value={icon} className={theme.icon} /> : null}
            <span className={theme.label}>{label}</span>
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
