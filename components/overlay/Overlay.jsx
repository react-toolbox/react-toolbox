import React from 'react';
import ReactDOM from 'react-dom';
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
    this.app = document.querySelector('[data-react-toolbox="app"]') || document.body;
    this.node = document.createElement('div');
    this.node.setAttribute('data-react-toolbox', 'overlay');
    this.app.appendChild(this.node);
    this.handleRender();
    if (this.props.active) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
    }
  }

  componentDidUpdate () {
    this.handleRender();
    if (this.props.active && !this.escKeyListener) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
    }
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.node);
    this.app.removeChild(this.node);
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

  handleRender () {
    const className = ClassNames(style.root, {
      [style.active]: this.props.active,
      [style.invisible]: this.props.invisible
    }, this.props.className);

    const overlay = (
      <div className={className}>
        <div className={style.overlay} onClick={this.props.onClick} />
        {this.props.children}
      </div>
    );

    ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.node);
  }

  render () {
    return React.DOM.noscript();
  }
}

export default Overlay;
