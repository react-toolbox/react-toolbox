import React from 'react';
import style from './style';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <div data-react-toolbox='app' className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
