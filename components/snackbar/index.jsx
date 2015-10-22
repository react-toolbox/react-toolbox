import React from 'react';
import style from './style';
import Button from '../button';
import FontIcon from '../font_icon';

class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  };

  state = {
    active: false
  };

  handleClick = (event) => {
    this.setState({active: false});
    if (this.props.onClick) {
      this.props.onClick(event, this);
    }
  };

  renderButton () {
    if (this.props.action) {
      return (
        <Button
          kind='flat'
          className={style.button}
          label={this.props.action}
          onClick={this.handleClick}
        />
      );
    }
  }

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='snackbar' className={className}>
        { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon} /> : null }
        <span className={style.label}>{this.props.label}</span>
        { this.renderButton() }
      </div>
    );
  }

  hide () {
    this.setState({active: false});
  }

  show () {
    this.setState({active: true});
    if (this.props.timeout) {
      setTimeout(() => {
        this.setState({ active: false });
      }, this.props.timeout * 1000);
    }
  }
}

export default Snackbar;
