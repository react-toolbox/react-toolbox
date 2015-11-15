import React from 'react';
import ReactDOM from 'react-dom';
import Overlay from '../overlay';
import style from './style';

class Tooltip extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    active: false
  };

  componentDidMount = () => {
    const node = ReactDOM.findDOMNode(this.refs.tooltip);
    const parent = ReactDOM.findDOMNode(this).parentNode;

    if (parent) {
      parent.onmouseover = () => {
        const parentStyle = parent.currentStyle || window.getComputedStyle(parent);
        const offset = parseFloat(parentStyle['margin-bottom']) + parseFloat(parentStyle['padding-bottom']);
        const position = parent.getBoundingClientRect();

        node.style.top = `${position.top + position.height - offset}px`;
        node.style.left = `${position.left + parseInt((position.width / 2) - (node.offsetWidth / 2))}px`;
        if (!this.state.active) this.setState({ active: true});
      };
      parent.onmouseout = () => {
        if (this.state.active) this.setState({ active: false});
      };
    }
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.state.active) className += ` ${style.active}`;

    return (
      <Overlay active={this.state.active} opacity={0}>
        <span ref='tooltip' data-react-toolbox='tooltip' className={className}>
          {this.props.label}
        </span>
      </Overlay>
    );
  }
}

export default Tooltip;
