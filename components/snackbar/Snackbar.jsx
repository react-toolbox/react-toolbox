import React from 'react';
import ClassNames from 'classnames';
import Button from '../button';
import FontIcon from '../font_icon';
import Overlay from '../overlay';
import style from './style';

class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.any,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  };

  state = {
    curTimeout: null
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.active && nextProps.timeout) {
      if (this.state.curTimeout) clearTimeout(this.state.curTimeout);

      const curTimeout = setTimeout(() => {
        nextProps.onTimeout();
        this.setState({
          curTimeout: null
        });
      }, nextProps.timeout);

      this.setState({
        curTimeout
      });
    }
  }

  render () {
    const {action, active, icon, label, onClick, type } = this.props;
    const className = ClassNames([style.root, style[type]], {
      [style.active]: active
    }, this.props.className);

    return (
      <Overlay invisible>
        <div data-react-toolbox='snackbar' className={className}>
          {icon ? <FontIcon value={icon} className={style.icon} /> : null}
          <span className={style.label}>{label}</span>
          {action ? <Button className={style.button} label={action} onClick={onClick}/> : null}
        </div>
      </Overlay>
    );
  }
}

export default Snackbar;
