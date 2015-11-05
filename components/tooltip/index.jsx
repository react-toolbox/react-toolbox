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

  state = {
    active: this.props.active
  };

  componentDidMount = () => {
    const node = ReactDOM.findDOMNode(this);
    const parent = node.parentNode;
    if (parent) {
      parent.onmouseover = () => {
        const position = parent.getBoundingClientRect();
        node.style.top = `${position.top + position.height}px`;
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
      <span data-react-toolbox='tooltip' className={className}>
        {this.props.label}
      </span>
    );
  }
}

export default Tooltip;
