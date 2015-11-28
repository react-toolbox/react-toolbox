import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import style from './style';

const HIDE_TIMEOUT = 100;

class Tooltip extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    delay: React.PropTypes.number,
    label: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    delay: 0
  };

  state = {
    active: false
  };

  componentDidMount = () => {
    const parent = ReactDOM.findDOMNode(this).parentNode;

    if (parent.style.position !== 'relative' && parent.style.position !== 'absolute'){
      parent.style.position = 'relative';
    }

    parent.onmouseover = this.handleParentMouseOver;
    parent.onmouseout = this.handleParentMouseOut;
  };

  handleParentMouseOver = () => {
    setTimeout(() => {
      if (this.deferredHide) clearTimeout(this.deferredHide);
      const node = ReactDOM.findDOMNode(this);
      const parent = node.parentNode;
      const parentStyle = parent.currentStyle || window.getComputedStyle(parent);
      const offset = parseFloat(parentStyle['margin-bottom']) + parseFloat(parentStyle['padding-bottom']);
      const position = parent.getBoundingClientRect();

      node.style.top = `${position.height - offset}px`;
      node.style.left = `${parseInt((position.width / 2) - (node.offsetWidth / 2))}px`;
      if (!this.state.active) this.setState({ active: true});
    }, this.props.delay);
  };

  handleParentMouseOut = () => {
    if (this.state.active) {
      this.deferredHide = setTimeout(() => { this.setState({active: false}); }, HIDE_TIMEOUT);
    }
  };

  render () {
    const className = ClassNames(style.root, {
      [style.active]: this.state.active
    }, this.props.className);

    return (
      <span data-react-toolbox='tooltip' className={className}>
        {this.props.label}
      </span>
    );
  }
}

export default Tooltip;
