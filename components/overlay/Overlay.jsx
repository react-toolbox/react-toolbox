import React from 'react';
import Portal from '../hoc/Portal';
import ClassNames from 'classnames';
import style from './style';

class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    invisible: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onEscKeyDown: React.PropTypes.func
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount () {
    if (this.props.active) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
    }
  }

  componentDidUpdate () {
    if (this.props.active && !this.escKeyListener) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
    }
  }

  componentWillUnmount () {
    if (this.escKeyListener) {
      document.body.removeEventListener('keydown', this.handleEscKey);
      this.escKeyListener = null;
    }
  }

  handleEscKey (e) {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e);
    }
  }

  render () {
    const className = ClassNames(style.root, {
      [style.active]: this.props.active,
      [style.invisible]: this.props.invisible
    }, this.props.className);

    return (
      <Portal>
        <div className={className}>
          <div className={style.overlay} onClick={this.props.onClick} />
          {this.props.children}
        </div>
      </Portal>
    );
  }
}

export default Overlay;
