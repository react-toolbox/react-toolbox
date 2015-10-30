import React from 'react';
import Editor from '../../../editor';
import Preview from '../../../preview';
import codeText from '../modules/examples/example.txt';

class Playground extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = { code: codeText };

  handleCodeChange = (code) => {
    this.setState({code});
  };

  render () {
    return (
      <aside className={this.props.className}>
        <Editor codeText={this.state.code} onChange={this.handleCodeChange} />
        <Preview code={this.state.code} />
      </aside>
    );
  }
}

export default Playground;
