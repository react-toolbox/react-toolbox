import PropTypes from 'prop-types';
import React from 'react';
import Editor from '../../../editor';
import Preview from '../../../preview';
import codeText from '../modules/examples/example.txt';
import style from './playground.scss';

class Playground extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    code: codeText
  };

  handleCodeChange = (code) => {
    this.setState({code});
  };

  loadCode (code) {
    this.refs.editor.setCode(code);
  }

  render () {
    return (
      <aside className={this.props.className}>
        <Editor
          ref='editor'
          className={style.editor}
          codeText={this.state.code}
          onChange={this.handleCodeChange}
        />
        <Preview
          className={style.preview}
          code={this.state.code}
        />
      </aside>
    );
  }
}

export default Playground;
