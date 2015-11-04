import React from 'react';
import ReactDOM from 'react-dom';
import style from './style';

class Tooltip extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    active: false,
    className: ''
  };

  componentDidMount = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const parent = node.parentNode.getBoundingClientRect();
      node.style.top = `${parent.top + parent.height}px`;
      node.style.left = `${parent.left + (parent.width / 2) - (node.offsetWidth / 2)}px`;
    }
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.active) className += ` ${style.active}`;

    return (
      <span data-react-toolbox='tooltip' className={className}>
        {this.props.label}
      </span>
    );
  }
}

export default Tooltip;
