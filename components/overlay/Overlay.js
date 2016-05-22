import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Portal from '../hoc/Portal';

class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    invisible: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onEscKeyDown: React.PropTypes.func,
    theme: React.PropTypes.shape({
      active: React.PropTypes.string.isRequired,
      backdrop: React.PropTypes.string.isRequired,
      invisible: React.PropTypes.string.isRequired,
      overlay: React.PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount () {
    if (this.props.active) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUpdate (nextProps) {
    if (nextProps.active && !this.props.active) document.body.style.overflow = 'hidden';
    if (!nextProps.active && this.props.active) document.body.style.overflow = null;
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
    const { active, className, children, invisible, onClick, theme } = this.props;
    const _className = classnames(theme.overlay, {
      [theme.active]: active,
      [theme.invisible]: invisible
    }, className);

    return (
      <Portal>
        <div className={_className}>
          <div className={theme.backdrop} onClick={onClick} />
          {children}
        </div>
      </Portal>
    );
  }
}

export default themr('ToolboxOverlay')(Overlay);
