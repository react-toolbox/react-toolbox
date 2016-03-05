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
    animationDelay: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    className: React.PropTypes.string,
    icon: React.PropTypes.any,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  };

  static defaultProps = {
    animationDuration: 350,
    animationDelay: 350
  };

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  render () {
    const {action, active, icon, label, onClick, type, animationDuration, animationDelay} = this.props;
    const className = ClassNames([style.root, style[type]], this.props.className);

    return (
      <Overlay active={active} invisible animationDuration={animationDuration + animationDelay}>
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
