import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import ActivableRenderer from '../hoc/ActivableRenderer';
import Button from '../button';
import FontIcon from '../font_icon';
import Overlay from '../overlay';

class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    theme: React.PropTypes.shape({
      accept: React.PropTypes.string,
      active: React.PropTypes.string,
      button: React.PropTypes.string,
      cancel: React.PropTypes.string,
      icon: React.PropTypes.string,
      label: React.PropTypes.string,
      snackbar: React.PropTypes.string,
      warning: React.PropTypes.string
    }),
    timeout: React.PropTypes.number,
    type: React.PropTypes.oneOf([ 'accept', 'cancel', 'warning' ])
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

export default themr('ToolboxSnackbar')(ActivableRenderer()(Snackbar));
