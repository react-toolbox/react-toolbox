import React from 'react';
import style from './style';

class Drawer extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    hideable: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['left', 'right'])
  };

  static defaultProps = {
    className: '',
    hideable: true,
    type: 'left'
  };

  state = {
    active: this.props.active
  };

  handleOverlayClick = () => {
    if (this.props.hideable) {
      this.setState({active: false});
    }
  };

  render () {
    let className = `${style.drawer} ${style[this.props.type]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='drawer' className={className}>
        <div className={style.overlay} onClick={this.handleOverlayClick}></div>
        <aside className={style.content}>
          { this.props.children }
        </aside>
      </div>
    );
  }

  show () {
    this.setState({active: true});
  }

  hide () {
    this.setState({active: false});
  }
}

export default Drawer;
