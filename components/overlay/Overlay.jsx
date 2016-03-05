import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import style from './style';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    invisible: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    invisible: false,
    active: false,
    animationDuration: 350
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.app = document.querySelector('[data-react-toolbox="app"]') || document.body;
    this.node = document.createElement('div');
    this.node.setAttribute('data-react-toolbox', 'overlay');
    this.app.appendChild(this.node);
    this.handleRender();
  }

  componentDidUpdate () {
    this.handleRender();
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.node);
    this.app.removeChild(this.node);
  }

  renderContent () {
    const {invisible, onClick, children, className} = this.props;
    const _className = ClassNames(style.root, {[style.invisible]: invisible}, className);
    return (
      <div className={_className}>
        <div className={style.overlay} onClick={onClick} />
        {children}
      </div>
    );
  }

  handleRender () {
    const {active, animationDuration} = this.props;
    ReactDOM.render(
      <ReactCSSTransitionGroup
        transitionName={{
          enter: 'rt-overlay-appear',
          enterActive: 'rt-overlay-appear-active',
          appear: 'rt-overlay-appear',
          appearActive: 'rt-overlay-appear-active',
          leave: 'rt-overlay-leave',
          leaveActive: 'rt-overlay-leave-active'
        }}
        transitionAppear
        transitionAppearTimeout={animationDuration}
        transitionLeaveTimeout={animationDuration}
        transitionEnterTimeout={animationDuration}
        >
        {active && this.renderContent()}
      </ReactCSSTransitionGroup>
    , this.node);
  }

  render () {
    return React.DOM.noscript();
  }
}

export default Overlay;
