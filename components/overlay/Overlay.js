import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { OVERLAY } from '../identifiers.js';
import Portal from '../hoc/Portal.js';

class Overlay extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    invisible: PropTypes.bool,
    onClick: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      backdrop: PropTypes.string,
      invisible: PropTypes.string,
      overlay: PropTypes.string
    })
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount () {
    if (this.props.active) {
      document.body.addEventListener('keydown', this.handleEscKey);
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUpdate (nextProps) {
    if (nextProps.active && !this.props.active) document.body.style.overflow = 'hidden';
    if (!nextProps.active && this.props.active && !document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
  }

  componentDidUpdate () {
    if (this.props.active) {
      document.body.addEventListener('keydown', this.handleEscKey);
    }
  }

  componentWillUnmount () {
    if (!document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
    document.body.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey = (e) => {
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
        <div className={_className} data-react-toolbox="overlay">
          <div className={theme.backdrop} onClick={onClick} />
          {children}
        </div>
      </Portal>
    );
  }
}

export default themr(OVERLAY)(Overlay);
export { Overlay };
